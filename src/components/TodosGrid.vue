

<template>
  <!-- https://www.telerik.com/kendo-vue-ui/components/grid/editing/editing-inline/ -->
  <!-- https://stackblitz.com/run/?file=src/main.vue -->
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
      take: 10,
      total: 100,
      updatedData: [],
      editID: null,
      columns: [
        {
          field: "userId",
          filterable: false,
          editable: false,
          title: "User Id",
          width: "80px",
        },
        { field: "id", title: "ID" },
        { field: "title", filter: "numeric", title: "Title" },
        {
          field: "completed",
          title: "Completed",
          filter: "numeric",
          width: "200px",
        }
      ],
    };
  },
  computed: {
    ...mapGetters(["allTodos"]),
    hasItemsInEdit() {
      return this.gridData.filter((p) => p.inEdit).length > 0;
    },
  },
  created: function () {
    this.fetchTodos();
    console.log(this.allTodos);
      this.updatedData =this.allTodos

    this.getData();
  },
  methods: {
    ...mapActions(["fetchTodos"]),
    itemChange: function (e) {
      if (e.dataItem.ProductID) {
        let index = this.gridData.findIndex(
          (p) => p.ProductID === e.dataItem.ProductID
        );
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
      let index = this.gridData.findIndex(
        (p) => p.ProductID === e.dataItem.ProductID
      );
      let updated = Object.assign({}, this.gridData[index], { inEdit: true });
      this.gridData.splice(index, 1, updated);
    },
    save: function (e) {
      let index = this.gridData.findIndex(
        (p) => p.ProductID === e.dataItem.ProductID
      );
      let item = this.gridData[index];
      let updated = Object.assign(this.update(this.gridData.slice(), item), {
        inEdit: undefined,
      });
      this.gridData.splice(index, 1, updated);
      let updateDataIndex = this.updatedData.findIndex(
        (p) => p.ProductID === e.dataItem.ProductID
      );
      this.updatedData.splice(updateDataIndex, 1, updated);
    },
    update(data, item, remove) {
      let updated;
      let index = data.findIndex(
        (p) => item.ProductID && p.ProductID === item.ProductID
      );
      if (index >= 0) {
        updated = Object.assign({}, item);
        data[index] = updated;
      } else {
        let id = 1;
        this.updatedData.forEach((p) => {
          if (p.ProductID) {
            id = Math.max(p.ProductID + 1, id);
          }
        });
        updated = Object.assign({}, item, { ProductID: id });
        data.unshift(updated);
        index = 0;
      }

      if (remove) {
        data = data.splice(index, 1);
      }
      return data[index];
    },
    cancel(e) {
      if (e.dataItem.ProductID) {
        let index = this.gridData.findIndex(
          (p) => p.ProductID === e.dataItem.ProductID
        );
        let updateDataIndex = this.updatedData.findIndex(
          (p) => p.ProductID === e.dataItem.ProductID
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
      this.gridData = process(this.updatedData, {
        take: this.take,
        skip: this.skip,
        sort: this.sort,
        filter: this.filter,
      }).data;

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
    createRandomData(count) {
      const productNames = [
        "Chai",
        "Chang",
        "Syrup",
        "Apple",
        "Orange",
        "Banana",
        "Lemon",
        "Pineapple",
        "Tea",
        "Milk",
      ];
      const unitPrices = [12.5, 10.1, 5.3, 7, 22.53, 16.22, 20, 50, 100, 120];
      const units = [2, 7, 12, 25, 67, 233, 123, 53, 67, 89];
      const trueFalse = [true, false];

      return Array(count)
        .fill({})
        .map((_, idx) => ({
          ProductID: idx + 1,
          ProductName:
            productNames[Math.floor(Math.random() * productNames.length)],
          UnitPrice: unitPrices[Math.floor(Math.random() * unitPrices.length)],
          UnitsInStock: units[Math.floor(Math.random() * units.length)],
          Discontinued: trueFalse[Math.floor(Math.random() * trueFalse.length)],
        }));
    },
  },
};
</script>
