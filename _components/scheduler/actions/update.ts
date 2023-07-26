import baseService from '@imagina/qcrud/_services/baseService.js'
import store from '../store/index.store'

export default async function updateScheduler(): Promise<void> {
    try {
        store.loading = true;
        await baseService.update('apiRoutes.qramp.schedulers', store.form.id, store.form);
        store.loading = false;
    } catch (error) {
      store.loading = false;
      console.log(error, 'updateScheduler');
    }
}