<template>
<k-dialog @close="cancel">
                <div :style="{ marginBottom: '1rem' }">
                    <label>
                    Name<br />
                    <k-input
                        type="text"
                        :name="'Name'"
                        v-model= "countryInEdit.Name"
                    ></k-input>
                    </label>
                </div>

                 <div :style="{ marginBottom: '1rem' }">
                    <label>
                    Description<br />
                    <k-input
                        type="text"
                        :name="'Description'"
                        v-model= "countryInEdit.Description"
                    ></k-input>
                    </label>
                </div>
                <div :style="{ marginBottom: '1rem' }">
                    <label>
                    skore<br />
                    <numerictextbox
                        :name="'skore'"
                        v-model="countryInEdit.skore"
                    ></numerictextbox>
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
        countryInEdit: {
          Name: '',
          skore: 0
        }
    };
  },
  created: function(){
    if(this.$props.dataItem){
      this.countryInEdit = this.$props.dataItem;
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
