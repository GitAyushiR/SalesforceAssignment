({
    doInit : function(component, event, helper) {
        var days30 =["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
        var days31 =["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
        var daysFeb = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
        
        var julDesc = ['July','August','September','October','November','December'];
        var janJune = ['January','February','March','April','May','June'];
        
        var julySept = ['July','August','September'];
        var octDec = ['October','November','December'];
        var janMar =['January','February','March'];
        var aprJune = ['April','May','June'];
        
        var setUpHeaderConfig ={
            '12' : {'Jan' : days31 ,
                    'Feb' : daysFeb,
                    'Mar' :  days31 , 
                    'Apr' :  days30, 
                    'May' :  days31 ,
                    'Jun' :  days30 ,
                    'Jul' :  days31, 
                    'Aug' :  days31, 
                    'Sep' :  days30, 
                    'Oct' :  days31 ,
                    'Nov' :  days30, 
                    'Dec' :  days31 
                   },
            '6' :{
                'Jul - Dec':julDesc,
                'Jan - Jun':janJune
            },
            '3':{
                'Jul - Sep':julySept,
                'Oct - Dec':octDec,
                'Jan - Mar':janMar, 
                'Apr - Jun': aprJune
            }
        }
		var noOfDaysConfig ={
			'January' : 31 ,
			'February' : 28,
			'March' :  31 , 
			'April' :  30, 
			'May' :  31 ,
			'June' :  30 ,
			'July' :  31, 
			'August' :  31, 
			'September' :  30, 
			'October' :  31 ,
			'November' :  30, 
			'December' :  31,
			
			'Jul - Dec':184,
			'Jan - Jun': 181,
			
			'Jul - Sep':92,
			'Oct - Dec':92,
			'Jan - Mar':90, 
			'Apr - Jun': 91
		}
		var monthObj ={"Jan":0,"Feb":1,"Mar":2,"Apr":3,"May":4,"Jun":5,"Jul":6,"Aug":7,"Sep":8,"Oct":9,"Nov":10,"Dec":11,
						"Jul - Dec":6, "Jan - Jun":0,
						"Jul - Sep":6, "Oct - Dec":9, "Jan - Mar":0,"Apr - Jun":3 };
        var monthAbbrivationMap ={"Jan":"January","Feb":"February","Mar":'March',"Apr":'April',"May":'May',"Jun":"June","Jul":"July","Aug":"August","Sep":"September","Oct":"October","Nov":"November","Dec":"December",
						"Jul - Dec":"Jul - Dec", "Jan - Jun":"Jan - Jun",
						"Jul - Sep":"Jul - Sep", "Oct - Dec":"Oct - Dec", "Jan - Mar":"Jan - Mar","Apr - Jun":"Apr - Jun" };
		
        component.set("v.setUpHeaderConfig", {"headerData":setUpHeaderConfig, "noOfDaysConfig": noOfDaysConfig ,
                                              "monthObj": monthObj,"monthAbbrivationMap": monthAbbrivationMap});
     
    },
	expandIt : function(component, event, helper) {
        component.set("v.isDetailsCmpActive", true);
		//event.currentTarget.parentElement.classList.toggle("month-expand");
        
        var dataset =  event.currentTarget.dataset;
        var selectedMonth = dataset.selectedmonth;
        var selectedMonthPrefix = dataset.selectedmonthprefix;
        
        component.set("v.selectedMonth", selectedMonth);
        component.set("v.selectedMonthPrefix", selectedMonthPrefix);
        
        helper.fireDetailRequestEvent(component,helper,selectedMonth,true );
	},
    activateOrDeativateDetailView : function(component, event, helper) {
        var params = event.getParam('arguments');
        if (params) {       
            var isActivate = params.isActivate;
            var isGapCalendarActive = params.isGapCalendarActive;
            if(isActivate == true){
                component.set("v.isDetailsCmpActive", true);
            }else{
                component.set("v.isDetailsCmpActive", false);
                component.set("v.isGapCalendarActive", false);
            }
            
            if(isGapCalendarActive == false){
                component.set("v.isGapCalendarActive", false);
            }
        }
    },
    showCalendarHeaderMonths : function(component, event, helper) {//added by bharat P4
        var params = event.getParam('arguments');
        if (params) {       
            var selectedMonthFix = params.selectedMonthFix;
        var selectedMonth=selectedMonthFix;
			var selectedMonthPrefix='';
		if(selectedMonth=='Jul - Dec'){			
		selectedMonthPrefix='H1';		
		}else if(selectedMonth=='Jan - Jun'){
			selectedMonthPrefix='H2';
		}else if(selectedMonth=='Jul - Sep'){
			selectedMonthPrefix='Q1';
		}else if(selectedMonth=='Oct - Dec'){
			selectedMonthPrefix='Q2';
		}else if(selectedMonth=='Jan - Mar'){
			selectedMonthPrefix='Q3';
		}else if(selectedMonth=='Apr - Jun'){
			selectedMonthPrefix='Q4';
		}
		component.set("v.selectedMonth", selectedMonth);
        component.set("v.selectedMonthPrefix", selectedMonthPrefix);
        }
    },
    configureHeaderRequest : function(component, event, helper) {
        var params = event.getParam('arguments');
        if (params) {       
            var selectedYear = params.selectedYear;
            var selectedMonthType = params.selectedMonthType;
            var selectedMonths = params.selectedMonth;//added by bharat P4
            if(selectedMonths){
                var selectedMonth = selectedMonths;
            }else{
                var selectedMonth = component.get("v.selectedMonth");
            }
			var setUpHeaderConfig = component.get("v.setUpHeaderConfig");
            var noOfDaysConfig = JSON.parse(JSON.stringify(setUpHeaderConfig.noOfDaysConfig));
			var headerData = setUpHeaderConfig.headerData;
            var monthObj = setUpHeaderConfig.monthObj;
			var monthAbbrivationMap = setUpHeaderConfig.monthAbbrivationMap;
            
            var currentConfig = headerData[selectedMonthType][selectedMonth];
            
            if(selectedMonth == 'Feb'){
                currentConfig = JSON.parse(JSON.stringify(currentConfig));
                
                var febDays = new Date(selectedYear, 2, 0).getDate();
                if(febDays==29){
					currentConfig.push("29");
					noOfDaysConfig['Feb'] = 29;
					noOfDaysConfig['Jan - Jun'] = noOfDaysConfig['Jan - Jun']+1;
					noOfDaysConfig['Jan - Mar'] = noOfDaysConfig['Jan - Mar']+1;
				}
                    
            }
            
			var headerConfig =[];
            for(var i=0;i<currentConfig.length; i++){
				var monthName = currentConfig[i];
				
				var noOfDays = noOfDaysConfig[monthName];
				if(selectedMonthType == '12'){
					noOfDays = 1;
				}
				headerConfig.push({"label": monthName, "noOfDays":noOfDays });
			}
			
			var boxRatio = 100/noOfDaysConfig[monthAbbrivationMap[selectedMonth]];
			
			var selectedYear = component.get("v.selectedYear");
			var nextMonthIndex = 1;
			if(selectedMonthType == '12'){
				nextMonthIndex =1;
			}else if(selectedMonthType == '6'){
				nextMonthIndex =6;
			}else{
				nextMonthIndex = 3;
			}
		
			var monthNumber = monthObj[selectedMonth];
			selectedYear = monthNumber<= 5 ? selectedYear : selectedYear -1;
			
			var visibleStartDate = new Date(selectedYear,monthNumber, 1);
			var visibleEndDate = new Date(selectedYear, monthNumber+nextMonthIndex, 0);
			
            component.set("v.calendarDetailConfig", {"headerConfig": headerConfig,
                                                     "boxRatio":boxRatio,
                                                     "visibleStartDate": visibleStartDate,
                                                     "visibleEndDate": visibleEndDate});
            
            var slideCmp = component.find("slideCmpId");
            if(slideCmp){
                slideCmp.resetScrollConfigs();
            }
			
        } 
    }
})