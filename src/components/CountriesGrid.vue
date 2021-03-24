<template>
<div>
    <datasource ref="remoteDataSource"
                      :transport-read-url="'https://localhost:44372/api/Countries/GetByOdata'"
                      :transport-read-data-type="'json'"
                      :transport-read-type="'GET'"
                 
                      :schema-model-id="'Id'"
                      :page-size='20'>
    </datasource>

    <grid :height="600"
                :data-source-ref="'remoteDataSource'"
                :pageable='true'
                :editable="'inline'">
        <grid-column field="Id"></grid-column>
        <grid-column field="Name" title="Name" :width="120"></grid-column>
        <grid-column field="Description" title="Description" :width="120"></grid-column>
        <grid-column field="Skore" title="Description" :width="120"></grid-column>
         <grid-column field="Ts" title="Description" :width="120"></grid-column>
      <grid-column :command="['edit']" title="&nbsp;" width="250px"></grid-column>
    </grid>
</div>
</template>

<script>
import { DataSource } from '@progress/kendo-datasource-vue-wrapper';
import { Grid, GridColumn } from '@progress/kendo-grid-vue-wrapper';

export default {
	name: 'App',
	components: {
		'grid': Grid,
		'grid-column': GridColumn,
		'datasource': DataSource
    },
    data: function() {
        return {
            dataSourceArray: [
                { text: 'Albania', value: '1' },
                { text: 'Andorra', value: '2' },
                { text: 'Armenia', value: '3' },
                { text: 'Austria', value: '4' },
                { text: 'Azerbaijan', value: '5' },
                { text: 'Belarus', value: '6' },
                { text: 'Belgium', value: '7' }
            ]
        }
    }
}
</script>
