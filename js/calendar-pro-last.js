(function($){
	var calendarDate = {};
	var riliHtml = '';
	calendarDate.today = new Date();
	calendarDate.year = calendarDate.today.getFullYear();//当前年
	calendarDate.month = calendarDate.today.getMonth()+1;//当前月
	calendarDate.date = calendarDate.today.getDate();//当前日
	calendarDate.day = calendarDate.today.getDay();//当前周几
	
	
	//绘制
	function getIndexDay(date,type){
		if (date == "day") {
			isLeapYear();
				getDays();
				riliHtml = '';
				//本月一号周几
				calendarDate.monthStart = new Date(calendarDate.year+"/"+calendarDate.month+"/1").getDay();
			//上个月所占空格数
			// console.log(calendarDate)
			if( calendarDate.monthStart == 0 ){//独占一行
				calendarDate.monthStart = 7;
			}
			//上月数据 不添加元素 留作占位 
			for( var i = calendarDate.monthStart;i>0;i-- ){
				var dataDateStr = calendarDate.lastYear + "-" + calendarDate.lastMonth + "-" + (calendarDate.lastDays - i + 1);
				riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="'+ dataDateStr +'"><span class="ht-rili-day"></span><span class="ht-rili-money"></span></div>'
			}
			//本月数据 
			console.log('当前数据 jq--- type ', type );

			for( var k = 0;k<calendarDate.days;k++ ){
				var flag // 对比渲染日期 跟当前数据日期 是否相等
				var dataDateStr = calendarDate.year + "-" + calendarDate.month + "-" + ( k + 1  );
				for( var d in calendarDate.opt.data ){
					var nowDate = dataDateStr;
					// console.log('当前数据 d ',  d);
					var dataDate = calendarDate.opt.data[d].date; // 当前日期
					var dataData = calendarDate.opt.data[d].data; // 当前日期数据 data 
					flag = checkDate(nowDate,dataDate);
					// true 相等时 渲染数据data
					if( flag ){
						// 当前日期数据 为 收益率时 
						if (type== 'Yield') {
							$(`.ht-rili-body`).empty()
							if (calendarDate.opt.data[d].data.split('%')[0]>0) {
								
								riliHtml += '<div class="ht-rili-td ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1) +'</span><span class="ht-rili-money" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click"></span></span></div>';
							} else if (!dataData) {
								// 当前日期无数据时 
								riliHtml += '<div class="ht-rili-td" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1) +'</span></div>';
								
							}else {
								riliHtml += '<div class="ht-rili-td ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1) +'</span><span class="ht-rili-money-down" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click"></span></span></div>';
							}
							
						} else {
							$(`.ht-rili-body`).empty()
							// 当前日期数据为金额时 
							if (calendarDate.opt.data[d].data.replace(/,/g,'')>0) {
								
								riliHtml += '<div class="ht-rili-td ht-rili-td-active  ht-rili-onclick" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1) +'</span><span class="ht-rili-money" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click"></span></span></div>';
							} else if (!dataData) {
								// 当前日期无数据时 
								riliHtml += '<div class="ht-rili-td" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1) +'</span></div>';
								
							}	else {
								riliHtml += '<div class="ht-rili-td ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1) +'</span><span class="ht-rili-money-down" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click"></span></span></div>';
							}
						}
						break;
					}
				}
				// 当前日期数据 不存在时  处理 周日周六
				if( !flag ){
					riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1) +'</span><span class="ht-rili-money"></span></div>';			
				}
			}
			//下月数据 不添加元素 留作占位
			for( var j = 0;j<(42 - calendarDate.days - calendarDate.monthStart);j++ ){//42-已占用表格数=剩余表格数
				var dataDateStr = calendarDate.nextYear + "-" + calendarDate.nextMonth + "-" + (j + 1);
				riliHtml += '<div class="ht-rili-td ht-rili-td-disabled" data-date="'+ dataDateStr +'"><span class="ht-rili-day"></span><span class="ht-rili-money"></span></div>';
			}
			// console.log('当前数据 riliHtml ', riliHtml );ht-rili-td-active-now-click
			// 添加元素 到模板
			$(`.ht-rili-body`).append(riliHtml);
			// 日期点击事件
			$('.ht-rili-onclick').on('click',function(){
				dateClick(this);
			})
		
			} else {
						//本年数据
						// 当不跨年时 
						riliHtml = ''; // 模板
					if (calendarDate.beginYear ===calendarDate.endYear ) {
						for( var k = 0;k<12;k++ ){
							var flag
							var dataDateStr = calendarDate.year + "-" + ( k + 1  )+"-00";
							// console.log('当前数据  dataDateStr',dataDateStr  );
							for( var d in calendarDate.opt.data ){
								// console.log('当前数据 d ',  d);
								var nowDate = dataDateStr;
								var dataDate = calendarDate.opt.data[d].date; 
								var dataData = calendarDate.opt.data[d].data; 
								flag = checkDateYear(nowDate,dataDate);
								// console.log('当前数据  flag ', calendarDate.opt.data[d].data );
								// console.log('当前数据 flg ',  flag);
								
								if( flag ){
									if (type== 'Yield') {
										$(`.ht-rili-body2`).empty()
										if (calendarDate.opt.data[d].data.split('%')[0]>0) {
											
											riliHtml += '<div class="ht-rili-td-2 ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1)+"月" +'</span><span class="ht-rili-money" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click2"></span></span></div>';
										}else if (!dataData) {
											riliHtml += '<div class="ht-rili-td-2   " data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1) +"月"+'</span></div>';
											
										} else {
											riliHtml += '<div class="ht-rili-td-2 ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1)+"月"  +'</span><span class="ht-rili-money-down" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click2"></span></span></div>';
										}
										
									} else {
										$(`.ht-rili-body2`).empty()
										if (calendarDate.opt.data[d].data.replace(/,/g,'')>0) {
											riliHtml += '<div class="ht-rili-td-2  ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1)+"月"  +'</span><span class="ht-rili-money" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click2"></span></span></div>';
										} else if (!dataData) {
											riliHtml += '<div class="ht-rili-td-2" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1)+"月" +'</div>';
										} else {
											riliHtml += '<div class="ht-rili-td-2 ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1)+"月"  +'</span><span class="ht-rili-money-down" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click2"></span></span></div>';
										}
									}
									break;
								}
							}
							if( !flag ){
								riliHtml += '<div class="ht-rili-td-2 ht-rili-td-disabled-2" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1)+"月" +'</span><span class="ht-rili-money"></span></div>';	
							}
						}
						
					} else {
						// 跨年时 
						// calendarDate.endMonth 结束月份 
						for( var k = calendarDate.endMonth;k<12+calendarDate.endMonth;k++ ){
							var flag,flag2
							var dataDateStr = calendarDate.beginYear + "-" + ( k + 1  )+"-00"; // 开始年的时间格式
							var dataDateStr2 = calendarDate.endYear + "-" + ( k + 1  )+"-00"; // 结束年时间格式
							// console.log('当前数据  dataDateStr',dataDateStr  );
							for( var d in calendarDate.opt.data ){
								var nowDate = dataDateStr;
								var nowDate2 = dataDateStr2;
								var dataDate = calendarDate.opt.data[d].date; 
								var dataData = calendarDate.opt.data[d].data; 
								flag = checkDateYear(nowDate,dataDate); // 开始年 检查
								flag2 = checkDateYear(nowDate2,dataDate); // 结束年检查
								// 开始年数据处理
								if( flag ){
									if (type== 'Yield') {
										$(`.ht-rili-body2`).empty()
										if (calendarDate.opt.data[d].data.split('%')[0]>0) {
											
											riliHtml += '<div class="ht-rili-td-2 ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1)+"月" +'</span><span class="ht-rili-money" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click2"></span></span></div>';
										}else if (!dataData) {
											riliHtml += '<div class="ht-rili-td-2   " data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1) +'</span></div>';
											
										} else {
											riliHtml += '<div class="ht-rili-td-2 ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1)+"月"  +'</span><span class="ht-rili-money-down" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click2"></span></span></div>';
										}
										
									} else {
										$(`.ht-rili-body2`).empty()
										if (calendarDate.opt.data[d].data.replace(/,/g,'')>0) {
											riliHtml += '<div class="ht-rili-td-2  ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1)+"月"  +'</span><span class="ht-rili-money" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click2"></span></span></div>';
										} else if (!dataData) {
											riliHtml += '<div class="ht-rili-td-2   " data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1) +'</span></div>';
										} else {
											riliHtml += '<div class="ht-rili-td-2 ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1)+"月"  +'</span><span class="ht-rili-money-down" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click2"></span></span></div>';
										}
									}
									break;
								}
								// 结束年数据处理
								if( flag2 ){
									if (type== 'Yield') {
										$(`.ht-rili-body2`).empty()
										if (calendarDate.opt.data[d].data.split('%')[0]>0) {
											
											riliHtml += '<div class="ht-rili-td-2 ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr2 +'"><span class="ht-rili-day">'+ (k - 11)+"月" +'</span><span class="ht-rili-money" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click2"></span></span></div>';
										}else if (!dataData) {
											riliHtml += '<div class="ht-rili-td-2 " data-date="'+ dataDateStr2 +'"></span></div>';
											
										} else {
											riliHtml += '<div class="ht-rili-td-2 ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr2 +'"><span class="ht-rili-day">'+ (k - 11)+"月"  +'</span><span class="ht-rili-money-down" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click2"></span></span></div>';
										}
										
									} else {
										$(`.ht-rili-body2`).empty()
										if (calendarDate.opt.data[d].data.replace(/,/g,'')>0) {
											riliHtml += '<div class="ht-rili-td-2  ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr2 +'"><span class="ht-rili-day">'+ (k - 11)+"月"  +'</span><span class="ht-rili-money" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click2"></span></span></div>';
										} else if (!dataData) {
											riliHtml += '<div class="ht-rili-td-2" data-date="'+ dataDateStr2 +'"><span class="ht-rili-day">'+ (k - 11) +'</span></div>';
										} else {
											riliHtml += '<div class="ht-rili-td-2 ht-rili-td-active ht-rili-onclick" data-date="'+ dataDateStr2 +'"><span class="ht-rili-day">'+ (k - 11)+"月"  +'</span><span class="ht-rili-money-down" data-money="'+ calendarDate.opt.data[d].data +'">'+ calendarDate.opt.data[d].data +'<span class="ht-rili-td-active-now-click2"></span></span></div>';
										}
									}
									break;
								}
							}
	
							if( !flag ){
								// riliHtml += '<div class="ht-rili-td-2 ht-rili-td-disabled-2" data-date="'+ dataDateStr +'"><span class="ht-rili-day">'+ (k + 1)+"月" +'</span><span class="ht-rili-money"></span></div>';	
							}
						}
					}
			$(`.ht-rili-body2`).append(riliHtml);
			$('.ht-rili-onclick').on('click',function(){
				dateClick2(this);
			})
			} 
		
	}
	//是否是闰年
	function isLeapYear(){
		if( (calendarDate.year % 4 == 0) && (calendarDate.year % 100 != 0 || calendarDate.year % 400 == 0) ){
			calendarDate.isLeapYear = true;
		}else{
			calendarDate.isLeapYear = false;
		}
	}
	//日期点击事件 -月
	function dateClick(obj){
		$(obj).siblings().each(function(){
			$(this).removeClass(`ht-rili-td-active-nows`);

		});
		$(obj).addClass(`ht-rili-td-active-nows`);
		console.log('当前数据 12234 ',  12234);
		$('.ht-rili-td').each(function(){
			$(this).find(".ht-rili-td-active-now-click").removeClass("ht-rili-td-active-now");
    });
		$(obj).find('.ht-rili-td-active-now-click').addClass('ht-rili-td-active-now');
	}
	//日期点击事件-年
	function dateClick2(obj){
		$(obj).siblings().each(function(){
			$(this).removeClass(`ht-rili-td-active-nows-year`);
		});
		console.log('当前数据ht-rili-td-active-nows-year  ', obj );
		$(obj).addClass(`ht-rili-td-active-nows-year`);
		$('.ht-rili-td-2').each(function(){
			$(this).find(".ht-rili-td-active-now-click2").removeClass("ht-rili-td-active-now-year");
		});
		$(obj).find('.ht-rili-td-active-now-click2').addClass('ht-rili-td-active-now-year');
	}
	//获取上个月份，本月，下个月份信息
	function getDays(){
		//上月天数
        if(  parseInt(calendarDate.month) == 1 ){
        	calendarDate.lastDays = new Date(calendarDate.year-1,12, 0).getDate();
        	calendarDate.lastMonth = new Date(calendarDate.year-1,12, 0).getMonth()+1;
        	calendarDate.lastYear = new Date(calendarDate.year-1,12, 0).getFullYear();
        }else{
            calendarDate.lastDays = new Date(calendarDate.year,calendarDate.month-1, 0).getDate();
            calendarDate.lastMonth = new Date(calendarDate.year,calendarDate.month-1, 0).getMonth()+1;
            calendarDate.lastYear = new Date(calendarDate.year,calendarDate.month-1, 0).getFullYear();
        }
        //下个月天数
        if( parseInt(calendarDate.month) == 12 ){
            calendarDate.nextDays  = new Date(calendarDate.year+1,1, 0).getDate();
            calendarDate.nextMonth  = new Date(calendarDate.year+1,1, 0).getMonth()+1;
            calendarDate.nextYear  = new Date(calendarDate.year+1,1, 0).getFullYear();
        }else{
            calendarDate.nextDays  = new Date(calendarDate.year,calendarDate.month+1, 0).getDate();
            calendarDate.nextMonth  = new Date(calendarDate.year,calendarDate.month+1, 0).getMonth()+1;
            calendarDate.nextYear  = new Date(calendarDate.year,calendarDate.month+1, 0).getFullYear();
        }
        //本月天数
		calendarDate.days = new Date(calendarDate.year,calendarDate.month, 0).getDate();
	}
	//检测时间是否一致
	function checkDate( dateStr1, dateStr2 ){
		// console.log('当前数据 dateStr1, dateStr2 ', dateStr1, dateStr2 );
		var date1 = dateStr1.split("-"); //[0]year,[1]month,[2]date;
		var date2 = dateStr2.split("-"); //[0]year,[1]month,[2]date;
		if( date1[1] < 10 && date1[1].length < 2){
			date1[1] = "0"+date1[1];
		}
		if( date1[2] < 10 && date1[2].length < 2){
			date1[2] = "0"+date1[2];
		}
		if( date2[1] < 10 && date2[1].length < 2){
			date2[1] = "0"+date2[1];
		}
		if( date2[2] < 10 && date2[2].length < 2){
			date2[2] = "0"+date2[2];
		}
		date1 = date1.join("-");
		date2 = date2.join("-");
		return date1 == date2;
	}
	//检测时间是否一致 年
	function checkDateYear( dateStr1, dateStr2 ){
		// console.log('当前数据 dateStr1, dateStr2 ', dateStr1, dateStr2 );
		var date1 = dateStr1.split("-"); //[0]year,[1]month,[2]date;
		var date2 = dateStr2.split("-"); //[0]year,[1]month,[2]date;
		if( date1[1] < 10 && date1[1].length < 2){
			date1[1] = "0"+date1[1];
		}
		if( date1[2] < 10 && date1[2].length < 2){
			date1[2] = "0"+date1[2];
		}
		if( date2[1] < 10 && date2[1].length < 2){
			date2[1] = "0"+date2[1];
		}
		if( date2[2] < 10 && date2[2].length < 2){
			date2[2] = "0"+date2[2];
		}
		if (date1[1] > 12) {
      // 跨年时逻辑处理 
			date1[1]=date1[1] - 12 > 10 ? 	date1[1] - 12: "0"+	(date1[1] - 12)
	  }
		date1 = date1.join("-");
		date2 = date2.join("-");
		// console.log('当前数据 date1 ',  date1 ,date2);
		return date1 == date2;
	}
	// 继承 calendar / calendarGetActive
	// $.extend($.fn,{ zpttro 
		$.fn.extend({ // jq
	    calendar:function(opt){
				console.log('当前数据 opt ',  opt);
	        if( (opt.beginDate != undefined && opt.endDate != undefined )||( opt.data.length > 0 ) ){
	        	var beginDate = opt.data[0].date;
	        	var endDate = opt.data[opt.data.length-1].date;
	        	calendarDate.beginYear = parseInt(beginDate.split('-')[0]);//起始年
						calendarDate.beginMonth = parseInt(beginDate.split('-')[1]);//起始月
						calendarDate.beginDate = parseInt(beginDate.split('-')[2]);//起始日
	        	
	        	calendarDate.endYear = parseInt(endDate.split('-')[0]);//结束年
						calendarDate.endMonth = parseInt(endDate.split('-')[1]);//结束月
						calendarDate.endDate = parseInt(endDate.split('-')[2]);//结束日
				
						calendarDate.year = parseInt(beginDate.split('-')[0]);//设置起始日期为当前日期
						calendarDate.month = parseInt(beginDate.split('-')[1]);//设置起始日期为当前日期
						calendarDate.date = parseInt(beginDate.split('-')[2]);//设置起始日期为当前日期
	        	calendarDate.opt = opt;
	        	
	        }else{
	        	console.log('未传入beginDate或endDate！');
					}
					let type = opt.types
					let date = opt.date
					//加载容器
						if (date == "day") {
							console.log('当前数据 1111 ',  1111);
							  calendarDate.header = '<div class="ht-rili-head"><div class="ht-rili-th">日</div><div class="ht-rili-th">一</div><div class="ht-rili-th">二</div><div class="ht-rili-th">三</div><div class="ht-rili-th">四</div><div class="ht-rili-th">五</div><div class="ht-rili-th">六</div></div>'
								calendarDate.container =	calendarDate.header +`<div class="ht-rili-body"></div>`
						} else {
								calendarDate.container = `<div class="ht-rili-body2"></div>`
						}
						$(opt.ele).append(calendarDate.container);
						getIndexDay(date,type);
	    },
			calendarGetActive: function(type){//获取当前选中日期的值
				console.log('当前数据 34567 ',  34567);
				//未选中时返回undefined
				var activeEle 
			if (type== 'year'|| type== 'nearyear'){
					activeEle = $(this).find(`.ht-rili-td-active-nows-year`);
				} else{
					activeEle = $(this).find(`.ht-rili-td-active-nows`);
				}
				var date = activeEle.attr("data-date");
				console.log('当前数据 date ',  date);
				if (date) 
	    	return date
	    }
	});
})(jQuery)