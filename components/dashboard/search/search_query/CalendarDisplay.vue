<script setup>

import dayjs from 'dayjs'
// add isBetween plugin
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

const props = defineProps({
  apply_queries: Array,
})

const is_ready = ref(false)

function getLimits() {
  if (!props.apply_queries)
    return {}
  // sort apply queries by "has_errors"
  props.apply_queries.sort((a, b) => {
    return a.has_errors - b.has_errors
  })
  return props.apply_queries.reduce((acc, apply_query) => {
    let base_limit = {has_errors: apply_query.has_errors}
    if (apply_query.from_date === apply_query.to_date)
      acc[apply_query.from_date] = {
        ...base_limit, icon: 'sync_alt', location: 'top left'}
    else{
      acc[apply_query.from_date] = {
        ...base_limit, icon: 'play_arrow', location: 'top left'}
      acc[apply_query.to_date] = {
        ...base_limit, icon: 'arrow_back_ios', location: 'top right'}
    }
    return acc
  }, {})
}

function getLimitsWithDayJS() {
  if (!props.apply_queries)
    return {}
  props.apply_queries.sort((a, b) => {
    return a.has_errors - b.has_errors
  })
  return props.apply_queries.map(apply_query => {
    return {
      from_date: dayjs(apply_query.from_date),
      to_date: dayjs(apply_query.to_date),
      has_errors: apply_query.has_errors,
      color: apply_query.has_errors ? 'orange' : 'cyan'
    }
  })
}

const recent_months_with_day_js = computed(() => {
  if (is_ready.value)
    return
  const now = dayjs()
  const three_months_ago = now.subtract(3, 'month')
  let current_day = three_months_ago.startOf('month')
  current_day = current_day.subtract(1, 'day')
  let all_days = {}
  const limits = getLimits()
  const between_dates = getLimitsWithDayJS()
  while (current_day.isBefore(now)){
    current_day = current_day.add(1, 'day')
    const year_month = current_day.format('YYYY-MM')
    const date_str = current_day.format('YYYY-MM-DD')
    const limit = limits[date_str]
    const is_between = between_dates.find(date => {
      if (current_day.isBetween(date.from_date, date.to_date, null, '[]'))
        return date
    })

    const day_obj = {
      number: current_day.date(),
      month: current_day.month() + 1,
      year: current_day.year(),
      full_day: date_str,
      limit: limit,
      is_between: is_between
    }
    if (all_days[year_month])
      all_days[year_month].push(day_obj)
    else
      all_days[year_month] = [day_obj]
  }
  console.log("all_days", all_days)
  return Object.entries(all_days).map(([month, days]) => {
    const month_str = dayjs(month).format('MMMM')
    return {"month": month_str, "days": days}
  })



})

</script>

<template>
  <v-card
    class="pa-2"
    color="grey-lighten-4"
    style="width: 100%;"
  >
    <div
      v-for="month in recent_months_with_day_js"
      :key="month.month"
      class="d-flex align-center"
    >
      <div
        class="text-subtitle-1 mr-3 text-left"
        style="width: 100px;"
      >
        {{month.month}}
      </div>
      <div
        v-for="day in month.days"
        :key="day.full_day"
      >
        <v-badge
          v-if="day.limit"
          color="transparent"
          variant="text"
          offset-x="5"
          :location="day.limit.location"
        >
          <template v-slot:badge>
            <v-icon
              :color="day.limit.has_errors ? 'red' : 'purple'"
              size="18"
            >
              {{day.limit.icon}}
            </v-icon>
          </template>
          <v-avatar
            :color="day.is_between?.color || 'cyan-lighten-4'"
            size="x-small"
            class="mr-1 text-caption text-grey-darken-3"
          >
            {{day.number}}
          </v-avatar>
        </v-badge>
        <v-avatar
          v-else
          :color="day.is_between?.color || 'cyan-lighten-4'"
          size="x-small"
          class="mr-1 text-caption text-grey-darken-2"
        >
          {{day.number}}
        </v-avatar>
      </div>
    </div>
  </v-card>

</template>

<style scoped>
.turn180 {
  transform: rotate(180deg);
}
</style>