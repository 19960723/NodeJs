import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/zh-cn'

// 扩展dayjs插件
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(timezone)

// 设置中文本地化
dayjs.locale('zh-cn')

export default dayjs
