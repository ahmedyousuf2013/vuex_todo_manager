<template>
<td>
    <button
        class="k-primary k-button k-grid-edit-command"
        @click="editHandler"
    >
        Edit
    </button>

    <button
        class="k-button k-grid-remove-command"
        @click="removeHandler"
    >
        Remove
    </button>
</td>
</template>
<script>

export default {
   props: {
        field: String,
        dataItem: Object,
        format: String,
        className: String, 
        columnIndex: Number,
        columnsCount: Number,
        rowType: String,
        level: Number,
        expanded: Boolean,
        editor: String
    },
    methods: {
        editHandler: function() {
            this.$emit('edit', this.dataItem);
        },
        removeHandler: function() {
            if(confirm('Confirm deleting: ' + this.dataItem.ProductName)){
               this.$emit('remove', this.dataItem);
            }
        }
    }
}
</script>
