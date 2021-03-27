<template>
  <div>
    <datasource
      ref="remoteDataSource"
      :transport-read-url="'https://localhost:44372/api/Countries/GetByOdata'"
      :transport-read-data-type="'json'"
      :transport-read-type="'GET'"
      :transport-update-url="'https://localhost:44372/api/Countries/Update'"
      :transport-update-data-type="'json'"
      :transport-update-type="'POST'"
      :schema-model-id="'Id'"
      :page-size="5"
    >
    </datasource>
    <!-- :filterable="true" -->
    <grid
      :height="370"
      :data-source-ref="'remoteDataSource'"
      :pageable="true"
      :sortable="true"
      :filterable-extra="false"
      :filterable-operators-string-eq="'Is equal to'"
      :filterable-operators-string-neq="'Not equal to'"
      :filterable-operators-string-startswith="'starts with'"
      :editable="'inline'"
    >
      <template v-slot:myTemplate="{ props }">
        <custom :data-item="props.dataItem" />
      </template>
      <grid-toolbar>
        <button title="Add new" class="k-button k-primary" @click="insert">
          Add new
        </button>
      </grid-toolbar>
      <grid-column field="Id"></grid-column>
      <grid-column field="Name" title="Name" :width="120"></grid-column>
      <grid-column
        field="Description"
        title="Description"
        :width="120"
      ></grid-column>
      <grid-column
        field="Skore"
        title="Skore"
        :width="120"
        :filterable-ui="skoreFilter"
        :format="'{0:c}'"
      ></grid-column>
      <grid-column
        field="Ts"
        title="Ts"
        :width="120"
        :format="'{0:MM/dd/yyyy}'"
        :filterable-ui="'datepicker'"
      ></grid-column>
      <grid-column
        :command="['edit']"
        title="&nbsp;"
        width="250px"
      ></grid-column>
    </grid>
    <country-Dialog   v-if="countryInEdit" :data-item="countryInEdit" @save="save" @cancel="cancel"> </country-Dialog>
  </div>
</template>



<script>
import { DataSource } from "@progress/kendo-datasource-vue-wrapper";
import { Grid, GridColumn } from "@progress/kendo-grid-vue-wrapper";
import  CountryDialog  from "./CountryDialog";
import { mapActions } from "vuex";

import { CommandNewCell } from "./CommandNewCell.vue";
import { GridToolbar } from "@progress/kendo-vue-grid";

export default {
  name: "App",
  components: {
    grid: Grid,
    'country-Dialog': CountryDialog,
    "grid-column": GridColumn,
    datasource: DataSource,
    "grid-toolbar": GridToolbar,
    custom: CommandNewCell,
  },
  data: function () {
    return {
      skores: [1, 2, 3, 4, 5],
      countryInEdit: undefined,
    };
  },
  methods: {

     ...mapActions([
      "AddCountry","UpdateCountry"
    ]),
    edit(dataItem) {
      this.countryInEdit = dataItem;
    },
    remove(dataItem) {
      // this.products = this.products.filter(
      //   (p) => p.ProductID !== dataItem.ProductID
      // );
      console.log(dataItem);
    },
    save() {
      const dataItem = this.countryInEdit ;
    //   const products = this.products.slice();
      const isNewCounty = dataItem.Id === undefined;

      if (isNewCounty ) {
        this.AddCountry(this.countryInEdit);
      } else {

        this.UpdateCountry(this.countryInEdit);
        // const index = products.findIndex(
        //   (p) => p.ProductID === dataItem.ProductID
        // );
        //products.splice(index, 1, dataItem);
      }

      // this.products = products;
     this.countryInEdit  = undefined;
    },
    cancel() {
      this.countryInEdit = undefined;
    },
    insert() {
      this.countryInEdit = {};
    },
    skoreFilter: function (element) {
      element.kendoDropDownList({
        dataSource: this.skores,
        optionLabel: "--Select Value--",
      });
    },
    dialogTitle() {
      return `${this.countryInEdit.Id === undefined ? "Add" : "Edit"} Country`;
    },
    newProduct(source) {
      console.log(source);
      // const id =
      //   this.products.reduce(
      //     (acc, current) => Math.max(acc, current.ProductID || 0),
      //     0
      //   ) + 1;
      // const newProduct = {
      //   ProductID: id,
      //   ProductName: "",
      //   UnitsInStock: 0,
      //   Discontinued: false,
      // };

      // return Object.assign(newProduct, source);
    },
  },
};
</script>
