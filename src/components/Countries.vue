

<template>
  <!-- https://www.telerik.com/kendo-vue-ui/components/grid/editing/editing-inline/ -->
  <!-- https://stackblitz.com/run/?file=src/main.vue -->
  <!-- https://www.telerik.com/kendo-vue-ui/components/grid/paging/ -->
  <Grid
    ref="grid"
    :style="{ height: '440px' }"
    :data-items="gridData"
    :edit-field="'inEdit'"
    :sortable="true"
    :pageable="pageable"
    :take="take"
    :skip="skip"
    :total="total"
    @itemchange="itemChange"
    @dataStateChange="dataStateChange"
    :columns="columns"
  >
    <template v-slot:myTemplate="{ props }">
      <custom
        :data-item="props.dataItem"
        @edit="edit"
        @save="save"
        @remove="remove"
        @cancel="cancel"
      />
    </template>
    <grid-toolbar>
      <button title="Add new" class="k-button k-primary" @click="insert">
        Add new
      </button>
      <button
        v-if="hasItemsInEdit"
        title="Cancel current changes"
        class="k-button"
        @click="cancelChanges"
      >
        Cancel current changes
      </button>
    </grid-toolbar>
    <grid-norecords> There is no data available custom </grid-norecords>
  </Grid>
</template>
<script>
import { Grid, GridToolbar, GridNoRecords } from "@progress/kendo-vue-grid";
import { process } from "@progress/kendo-data-query";
import { mapGetters, mapActions } from "vuex";
import CommandCell from "./CommandCell";

export default {
  components: {
    Grid: Grid,
    "grid-toolbar": GridToolbar,
    "grid-norecords": GridNoRecords,
    custom: CommandCell,
  },
  data: function () {
    return {
      filter: null,
      sort: null,
      pageable: true,
      gridData: [],
      skip: 0,
      take: 5,
      total: 100,
      updatedData: [],
      editID: null,
      columns: [
        {
          field: "Id",
          filterable: false,
          editable: false,
          title: "ID",
          width: "80px",
        },
        { field: "Name", title: "Name" },
        { field: "Description", title: "Description" },
        { field: "Skore", filter: "numeric", title: "Skore" },
        { field: "Ts", title: "ts", editable: false },
        { cell: "myTemplate", filterable: false, width: "210px" },
      ],
    };
  },
  computed: {
    ...mapGetters(["allCountries"]),
    hasItemsInEdit() {
      return this.gridData.filter((p) => p.inEdit).length > 0;
    },
  },
  created: function () {
    ////console.log('take'+this.take)

    this.updatedData = this.allCountries;

    this.getData();
  },
  methods: {
    ...mapActions([
      "fetchCountries",
      "AddCountry",
      "UpdateCountry",
      "DeleteCountry",
    ]),
    itemChange: function (e) {
      if (e.dataItem.Id) {
        let index = this.gridData.findIndex((x) => x.Id === e.dataItem.Id);
        let updated = Object.assign({}, this.gridData[index], {
          [e.field]: e.value,
        });
        this.gridData.splice(index, 1, updated);
      } else {
        e.dataItem[e.field] = e.value;
      }
    },
    insert() {
      const dataItem = { inEdit: true };
      //  const newproducts = this.gridData.slice();

      this.gridData.splice(0, 0, dataItem);
    },
    edit: function (e) {
      let index = this.gridData.findIndex((p) => p.id === e.dataItem.id);
      let updated = Object.assign({}, this.gridData[index], { inEdit: true });
      this.gridData.splice(index, 1, updated);
    },
    save: function (e) {
      console.log("saving");
      let index = this.gridData.findIndex((p) => p.id === e.dataItem.id);

      let item = this.gridData[index];
      let updated = Object.assign(this.update(this.gridData.slice(), item), {
        inEdit: undefined,
      });
      this.gridData.splice(index, 1, updated);
      let updateDataIndex = this.updatedData.findIndex(
        (p) => p.Id === e.dataItem.Id
      );
      this.updatedData.splice(updateDataIndex, 1, updated);
    },
    update(data, item, remove) {
      let updated;
      console.log("data is" + data);
      console.log("index is " + index);

      let index = data.findIndex((x) => x.Id === item.Id);
      if (index >= 0) {
        updated = Object.assign({}, item);
        data[index] = updated;
      } else {
        let id = 1;
        this.updatedData.forEach((p) => {
          if (p.id) {
            id = Math.max(p.id + 1, id);
          }
        });
        updated = Object.assign({}, item, { id: id });
        data.unshift(updated);
        index = 0;
      }

      if (remove) {
        data = data.splice(index, 1);
        this.DeleteCountry(item.Id);
      }
      if (!remove) {
        if (item.Id > 0) {
          this.UpdateCountry(item);
        } else {
          this.AddCountry(item);
        }
      }
      /////////////////
      this.fetchCountries();

      this.updatedData = this.allCountries;
      console.log(this.updatedData);

      this.getData();

      return data[index];
    },
    cancel(e) {
      if (e.dataItem.id) {
        let index = this.gridData.findIndex((p) => p.id === e.dataItem.Id);
        let updateDataIndex = this.updatedData.findIndex(
          (p) => p.id === e.dataItem.id
        );
        let updated = Object.assign(this.updatedData[updateDataIndex], {
          inEdit: undefined,
        });
        this.gridData.splice(index, 1, updated);
      } else {
        let index = this.gridData.findIndex(
          (p) => JSON.stringify(e.dataItem) === JSON.stringify(p)
        );

        this.gridData.splice(index, 1);
      }
    },
    remove(e) {
      e.dataItem.inEdit = undefined;
      this.update(this.gridData, e.dataItem, true);
      this.update(this.updatedData, e.dataItem, true);
      this.gridData = this.gridData.slice();
    },
    cancelChanges() {
      let editedItems = this.updatedData.filter((p) => p.inEdit === true);
      if (editedItems.length) {
        editedItems.forEach((item) => {
          item.inEdit = undefined;
        });
      }
      this.getData();
    },
    getData: function () {
      this.fetchCountries({
        skip: this.skip,
        take: this.take,
      });

      this.gridData = this.allCountries;
      //console.log(this.gridData);
      this.total = this.allCountries.length;

      //   this.gridData = process(this.updatedData, {
      //     take: this.take,
      //     skip: this.skip,
      //     sort: this.sort,
      //     filter: this.filter,
      //   }).data;

      this.total = process(this.updatedData, {
        filter: this.filter,
      }).total;
    },
    createAppState: function (dataState) {
      this.take = dataState.take;
      this.skip = dataState.skip;
      this.filter = dataState.filter;
      this.sort = dataState.sort;
      this.getData();
    },
    dataStateChange: function (event) {
      this.createAppState(event.data);
    },
  },
};
</script>
