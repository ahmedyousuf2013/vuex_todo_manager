<template>
<k-dialog @close="cancel">
                <div :style="{ marginBottom: '1rem' }">
                    <label>
                    Product Name<br />
                    <k-input
                        type="text"
                        :name="'ProductName'"
                        v-model= "productInEdit.ProductName"
                    ></k-input>
                    </label>
                </div>
                <div :style="{ marginBottom: '1rem' }">
                    <label>
                    Units In Stock<br />
                    <numerictextbox
                        :name="'UnitsInStock'"
                        v-model="productInEdit.UnitsInStock"
                    ></numerictextbox>
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            :name="'Discontinued'"
                            v-model="productInEdit.Discontinued"
                        />
                        Discontinued product
                    </label>
                </div>
            <dialog-actions-bar>
                <button
                    class="k-button"
                    @click="cancel"
                >
                    Cancel
                </button>
                <button
                    class="k-button k-primary"
                    @click="save"
                >
                    Save
                </button>
            </dialog-actions-bar>
        </k-dialog>
</template>
<script>
import { Dialog, DialogActionsBar } from '@progress/kendo-vue-dialogs';
import { NumericTextBox, Input } from '@progress/kendo-vue-inputs';

export default {
   components: {
        'k-input': Input,
        'numerictextbox': NumericTextBox,
        'k-dialog': Dialog,
        'dialog-actions-bar': DialogActionsBar
    },
   props: {
      dataItem: Object
  },
  data: function(){
    return {
        productInEdit: {
          ProductName: '',
          UnitsInStock: 0,
          Discontinued: false
        }
    };
  },
  created: function(){
    if(this.$props.dataItem){
      this.productInEdit = this.$props.dataItem;
    }
  },
  methods: {
      cancel(){
        this.$emit('cancel');
      },
      save(){
        this.$emit('save');
      }
  },
}
</script>
