import { computed } from "vue";
import storeKanban from "../store/kanban.store";
import moment, { Moment } from "moment";
import getWorkOrder from "../actions/getWorkOrder";
import { Columns } from "../contracts/kanbanStore.contract";
import storeFilters from "../store/filters.store";
import scheduleTypeModel from '../models/scheduleType.model';

export async function getColumns(): Promise<Columns[]> {
  try {
    const  weekAgenda = scheduleTypeModel[0].value;
    //storeKanban.scheduleType = storeFilters.scheduleType;
    const isWeek = storeKanban.scheduleType == weekAgenda;
    const days = isWeek ? 7 : 1 //full week | one day
    const startOfWeek: Moment = moment(storeFilters.selectedDate).startOf(
      "week"
    );

    return [...Array(days)].map((_, i) => ({
      date: isWeek ? moment(startOfWeek).add(i, "days") : moment(storeFilters.selectedDate),
      cards: [],
      page: 1,
      loading: false,
      total: 0,
      isDrag: false,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getCards(refresh = false): Promise<void> {
  try {
    storeKanban.columns.forEach(async (item: Columns) => {
      item.loading = true;
      const startDate = item.date.startOf('day');
      const endDate = item.date.endOf('day');
      const filterTime = storeFilters.filterTime;
      const response = await getWorkOrder(refresh, item.page, {
        field: "schedule_date",
        type: "customRange",
        from: startDate.set({ hour: filterTime[0], minute: 0, second: 0 }).format('YYYY-MM-DD HH:mm:ss'),
        to: endDate.set({ hour: filterTime[1], minute: 59, second: 59 }).format('YYYY-MM-DD HH:mm:ss')
      });
      item.cards = response.data;
      item.loading = false;
      item.total = response.meta.page.total;
    });
  } catch (error) {
    storeKanban.columns.forEach(async (item: Columns) => {
      item.loading = false;
    });
    console.log(error);
  }
}

export default async function buildKanbanStructure(refresh = false): Promise<void> {
  try {
    storeKanban.loading = true;
    storeKanban.columns = await getColumns();
    if(!storeFilters.stationId) return;
    await getCards(refresh);
    storeKanban.loading = false;
  } catch (error) {
    console.log(error);
    storeKanban.loading = false;
  }
}
