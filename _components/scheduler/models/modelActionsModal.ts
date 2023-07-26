import Vue, { computed, getCurrentInstance } from 'vue';
import save from '../actions/save'
import store from '../store/index.store'

export default function modelActionsModal(refFormFields: any) {
    const rootInstance = (getCurrentInstance() as any).proxy.$root;
    const actions = computed(() => ([
        {
            props: {
                color: 'primary',
                'icon-right': 'fa-thin fa-floppy-disk',
                label: Vue.prototype.$tr('isite.cms.label.save'),
            },
            action: () => {
                const refFormScheduler = refFormFields.value.$refs.refFormScheduler;
                if (refFormScheduler) {
                    refFormScheduler
                     .validate()
                     .then(async (success) => {
                        if (success) {
                            await save()
                            await store.reset();
                            rootInstance.$emit('crud.data.refresh');
                        }
                    })
                }
            }
        },
    ]))

    return {
        actions
    }
}