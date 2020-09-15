<!--
 * @Author: your name
 * @Date: 2020-09-15 15:18:37
 * @LastEditTime: 2020-09-15 15:41:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \calendarf:\GIT\calendar-pro\README.md
-->
# 基于jq的-日历组件
[jquery官网](https://jquery.com/)
## 参数:
1. 	ele : '.demo-box', //依附
2.  types: types, // 数据类型 Yield detail
3.  date: date, // 时间类型  day year 
4.  data : dataArr // 数据数组

## 事件:
1. init(dataArr,types,date) 初始化 
2. change(val) 切换时间
3. getActive(val) 获取选中时间

![效果图](https://github.com/Lingtian007/calendar-pro/blob/master/img/calendar.jpg)