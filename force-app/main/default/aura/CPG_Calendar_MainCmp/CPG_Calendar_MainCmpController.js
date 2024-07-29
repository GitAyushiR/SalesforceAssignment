({
    doInit : function(component, event, helper) {
        debugger;
        
        component.set("v.isGapCalendarActive", false); 
        
        var today = new Date();
        var monthNumber = today.getMonth();// 0- jan, 5-june, 6 -july
        component.set("v.selectedYear", (monthNumber >= 6 ? today.getFullYear() + 1 : today.getFullYear()));
        component.set("v.selectedMonthType", "12");
        
        var monthListMap ={
            "12" : ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'],
            "6"  : ['Jul - Dec','Jan - Jun'],
            "3"	 : ['Jul - Sep', 'Oct - Dec', 'Jan - Mar', 'Apr - Jun']
        };
        component.set("v.monthListMap",monthListMap);
        
        var monthPrefix ={
            'Jul - Dec' : 	'H1',
            'Jan - Jun' :	'H2',
            'Jul - Sep':	'Q1',
            'Oct - Dec' : 	'Q2',
            'Jan - Mar' :	'Q3',
            'Apr - Jun' :	'Q4'
        };
        component.set("v.monthPrefix",monthPrefix);//selectedMonthType
        //changes by bharat
        var monthListMapSpecificsix ={
              "Jul" : ['Jul - Dec'],
              "Aug" : ['Jul - Dec'],
			  "Sep"	: ['Jul - Dec'],
			  "Oct"	: ['Jul - Dec'],
			  "Nov"	: ['Jul - Dec'],
			  "Dec"	: ['Jul - Dec'],
			  "Jan"	: ['Jan - Jun'],
			  "Feb"	: ['Jan - Jun'],
			  "Mar"	: ['Jan - Jun'],
			  "Apr"	: ['Jan - Jun'],
			  "May"	: ['Jan - Jun'],
			  "Jun"	: ['Jan - Jun'],
        };
		 component.set("v.monthListMapSpecificsix",monthListMapSpecificsix);
		var monthListMapSpecificthree ={
              "Jul" : ['Jul - Sep'],
              "Aug" : ['Jul - Sep'],
			  "Sep"	: ['Jul - Sep'],
			  "Oct"	: ['Oct - Dec'],
			  "Nov"	: ['Oct - Dec'],
			  "Dec"	: ['Oct - Dec'],
			  "Jan"	: ['Jan - Mar'],
			  "Feb"	: ['Jan - Mar'],
			  "Mar"	: ['Jan - Mar'],
			  "Apr"	: ['Apr - Jun'],
			  "May"	: ['Apr - Jun'],
			  "Jun"	: ['Apr - Jun'],
        };
		 component.set("v.monthListMapSpecificthree",monthListMapSpecificthree);
		 
        var isLoadingMap =component.get("v.isLoadingMap");
        isLoadingMap = isLoadingMap ? isLoadingMap :{};
        isLoadingMap.isSummary = true; 
        component.set("v.isLoadingMap",isLoadingMap);
        
        
        var parameters ={
            "year":component.get("v.selectedYear"),
            "monthType": component.get("v.selectedMonthType"),
            "isColorCodingRequired" : true
        };
        var apexConfig={
            "parameters" : parameters,
            "isBackGround" : true
        };
        var callBackConfig ={
            "callBackParams" :{},
            "disableExceptionHandling": false,
            "enableCallbackOnException": false
        };
        helper.callApexMethod(component,helper,"getCalendarSummary",apexConfig,helper.resultCallBack_Summary,callBackConfig);
        
        
        var preloadDataGenerator = function(){
            var pre_summary =  {"name":"_","color":"#E8E8E8","noOfCalendars":1};
            var pre_summaryWrapper = {"name":"_", "linkedItems":[pre_summary,pre_summary,pre_summary,pre_summary,pre_summary,pre_summary,pre_summary,pre_summary,pre_summary,pre_summary]};
            var pre_SummaryList = [pre_summaryWrapper,pre_summaryWrapper,pre_summaryWrapper,pre_summaryWrapper,pre_summaryWrapper,pre_summaryWrapper,pre_summaryWrapper,pre_summaryWrapper,pre_summaryWrapper,pre_summaryWrapper,pre_summaryWrapper,pre_summaryWrapper];
            
            return pre_SummaryList;
        }
        
        component.set("v.calendarSummary",preloadDataGenerator());
        
        // if channel has no value specified, then "upNavigationWhite" will be used.
        var channelIconMap = {
            "Launches"  :["arrow-up-333","arrow-up"],
            "Renovation" : ["refresh-button-333","refresh-button"],
            "VAP": ["iconfinder-white-333","iconfinder"],
            "Sustainovation" : ["settings-white-333","settings"]
        };
        component.set("v.channelIconMap", channelIconMap);
        
    },
    handleTopNavChange : function(component, event, helper) {
        var changeType = event.getParam("changeType");
        var value = event.getParam("value");
          var headerChangeViewGrid = event.getParam("headerChange");//added by bharat P4
        value = changeType == 'year' ? parseInt(value) : value;
        if(component.get("v.selectMonthFixed").length==0){
            headerChangeViewGrid='false';
        }
        component.set("v.headerChangeViewGrid",headerChangeViewGrid);
        switch(changeType){
            case 'year':
                component.set("v.selectedYear", value);
                break;
                
            case 'monthType':
                component.set("v.selectedMonthType", value);
                if(component.get("v.isDetailsCmpActive") ==true && headerChangeViewGrid=='false'){
                    component.set("v.isDetailsCmpActive", false);
                    component.set("v.isGapCalendarActive", false);
                    
                    var detailCmp = component.find("landingCmpId");
                    if(detailCmp){
                        detailCmp.activateOrDeativateDetailView(false);
                    }
                } 
                if(component.get("v.isDetailsCmpActive") ==true && headerChangeViewGrid=='true'){
                    component.set("v.isDetailsCmpActive", true);
                    component.set("v.isGapCalendarActive", false);
                    
                    var detailCmp = component.find("landingCmpId");
                    if(detailCmp){
                        detailCmp.activateOrDeativateDetailView(true);
                    }
					//added by bharat starts
            var selectedmonth='';
           if(component.get("v.selectedMonthType")=='6' && component.get("v.selectMonthFixed").length=='3'){
			selectedmonth= component.get("v.monthListMapSpecificsix")[component.get("v.selectMonthFixed")].toString();
			}else if(component.get("v.selectedMonthType")=='3' && component.get("v.selectMonthFixed").length=='3'){
			selectedmonth= component.get("v.monthListMapSpecificthree")[component.get("v.selectMonthFixed")].toString();
            }else if(component.get("v.selectedMonthType")=='12' && component.get("v.selectMonthFixed").length=='3'){
                selectedmonth=component.get("v.selectMonthFixed");
            }else{
				selectedmonth=component.get("v.selectedMonth");
			}
            component.set("v.selectedMonth",selectedmonth);
            var detailCmp = component.find("landingCmpId");
                    if(detailCmp){
                        detailCmp.showCalendarHeaderMonths(selectedmonth);
                    }
            //added by bharat starts ends
                }
                break;
        } 
        
        helper.refreshView(component,helper);
    },
    handleDetailRequest : function(component, event, helper) {
        var selectedMonth = event.getParam("selectedMonth");
        var isDetailsCmpActive = event.getParam("isDetailsCmpActive");
        component.set("v.selectedMonth",selectedMonth);
        if(component.get("v.selectedMonthType")=='12'){ 
            component.set("v.selectMonthFixed",selectedMonth);
        }else{
            component.set("v.selectMonthFixed","");
        }
        component.set("v.isDetailsCmpActive",isDetailsCmpActive);
        
        helper.refreshView(component,helper);
    },
    handleGroupingChange : function(component, event, helper) {
        var selectedGroup1 = event.getParam("selectedGroup1");
        var selectedGroup2 = event.getParam("selectedGroup2");
        
        if(selectedGroup1 && ! selectedGroup2){
            selectedGroup2 = selectedGroup1;
            selectedGroup1 = 'Dummy';
        }
        
        if(selectedGroup2 == 'Dummy'){
            selectedGroup2 =selectedGroup1;
            selectedGroup1 = 'Dummy';
        }
        
        if(!selectedGroup1) selectedGroup1 = 'Dummy';
        if(!selectedGroup2) selectedGroup2 = 'Dummy';
        
        component.set("v.selectedGroup1",selectedGroup1);
        component.set("v.selectedGroup2",selectedGroup2);
        
        helper.refreshView(component,helper);
    },
    handleGapCalendarData  : function(component, event, helper) {
        var isGapCalendarActive = event.getParam("isGapCalendarActive");
        component.set("v.isGapCalendarActive", isGapCalendarActive); 
        
        if(isGapCalendarActive == true){
            helper.refreshView(component,helper);
        }
    },
    handleOneCalendarFilterEvent : function(component, event, helper) {
        
        var selectedFilters = event.getParam("selectedFilters");
        selectedFilters = selectedFilters ? selectedFilters : [];
        component.set("v.selectedFilters",selectedFilters);
        var filterComponent = component.find('filterComponent');
        filterComponent.onFilterHandle(selectedFilters);
        
        helper.refreshView(component,helper);
    },
    handleOneCalendarFilterRemoveEvent: function(component, event, helper) {
       
        var tagValueToRemove = event.getParam("tagValueToRemove");
        var tagNameToRemove = event.getParam("tagNameToRemove");
        if(!$A.util.isUndefinedOrNull(tagNameToRemove)){
            var allSelectedFilters = component.get("v.selectedFilters");
            allSelectedFilters = allSelectedFilters? allSelectedFilters :{};
            var indexToBeRemoved = -1;
            var selectedFilters = allSelectedFilters[tagNameToRemove] ? allSelectedFilters[tagNameToRemove] : [];
            for(var i in selectedFilters){
                if(selectedFilters[i].value === tagValueToRemove){
                    indexToBeRemoved = i;
                    break;
                }
            }
            if(indexToBeRemoved >= 0){
                selectedFilters.splice(indexToBeRemoved,1);
            }
            allSelectedFilters[tagNameToRemove] = selectedFilters;
            component.set("v.selectedFilters",allSelectedFilters);
        }
        if(!$A.util.isUndefinedOrNull(tagNameToRemove) && tagNameToRemove=='Brand'){
            var index=[];
            var j=0;
            var selectedFiltersBrandVariant=allSelectedFilters['Brand_Variant'] ? allSelectedFilters['Brand_Variant'] : [];
            for(var i in selectedFiltersBrandVariant){
                if(selectedFiltersBrandVariant[i].name === 'Brand_Variant'){
                    index.push(i);
                    j++;
                }
            }
            if(j>0){selectedFiltersBrandVariant.splice(index[0],j);}
            allSelectedFilters['Brand_Variant'] =  selectedFiltersBrandVariant;
            component.set("v.selectedFilters",allSelectedFilters);
        }
        if(!$A.util.isUndefinedOrNull(tagNameToRemove) && tagNameToRemove=='State'){
            var index=[];
            var j=0;
            var selectedFiltersBrandVariant=allSelectedFilters['Distributor'] ? allSelectedFilters['Distributor'] : [];
            for(var i in selectedFiltersBrandVariant){
                if(selectedFiltersBrandVariant[i].name === 'Distributor'){
                    index.push(i);
                    j++;
                }
            }
            if(j>0){selectedFiltersBrandVariant.splice(index[0],j);}
            allSelectedFilters['Distributor'] =  selectedFiltersBrandVariant;
            component.set("v.selectedFilters",allSelectedFilters);
        }
        //by bhavya
        if(!$A.util.isUndefinedOrNull(tagNameToRemove) && tagNameToRemove=='Program_Type' && tagValueToRemove=='Innovation'){
            
            var index=[];
            var j=0;
            var selectedFiltersBrandVariant=allSelectedFilters['Sales_Channel'] ? allSelectedFilters['Sales_Channel'] : [];
            for(var i in selectedFiltersBrandVariant){
                if(selectedFiltersBrandVariant[i].name === 'Sales_Channel'){
                    index.push(i);
                    j++;
                }
            }
            if(j>0){selectedFiltersBrandVariant.splice(index[0],j);}
            allSelectedFilters['Sales_Channel'] =  selectedFiltersBrandVariant;
            component.set("v.selectedFilters",allSelectedFilters);
            
        }
        //end
        var selectedFilters=null
        if(!$A.util.isUndefinedOrNull(tagNameToRemove))
        {
            selectedFilters=JSON.stringify(component.get("v.selectedFilters"));
        }
        else{
            component.set("v.selectedFilters",null);
        }
        
        helper.refreshView(component,helper);
        var filterComponent = component.find('ocSideFilter');
        filterComponent.onFilterRemoveHandle(tagValueToRemove,tagNameToRemove);     
    },
    closeGap : function(component, event, helper) {
        component.set("v.isGapCalendarActive", false);
        
        var detailCmp = component.find("landingCmpId");
        if(detailCmp){
            detailCmp.activateOrDeativateDetailView(true, false);
        }
    },
    //by bhavya
    generatePdf : function(component, event, helper) {
        debugger;
        
        var method = "post"; 
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", '/DiageoNow/TSP_OneCalendarPDF');///DiageoNow
        form.setAttribute("target", 'newTab');
        
        var calendarObj = {"calendarDetails": component.get("v.calendarDetails")};
        
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "calendarDetails");
        hiddenField.setAttribute("value",encodeURI(JSON.stringify(calendarObj)) );        
        form.appendChild(hiddenField);
        
        var selectedFilters = component.get("v.selectedFilters");
        selectedFilters = selectedFilters ? selectedFilters : {};
        
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "selectedFilters");
        hiddenField.setAttribute("value",encodeURI(JSON.stringify(selectedFilters)) );        
        form.appendChild(hiddenField);
        
        var group1=component.get("v.selectedGroup1");
        var group2=component.get("v.selectedGroup2");
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "group1");
        hiddenField.setAttribute("value",group1 );        
        form.appendChild(hiddenField);
        
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "group2");
        hiddenField.setAttribute("value",group2 );        
        form.appendChild(hiddenField);
        
        var year = component.get("v.selectedYear");
        var month= component.get("v.selectedMonth");
        var monthType= component.get("v.selectedMonthType");
        
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "year");
        hiddenField.setAttribute("value",year );        
        form.appendChild(hiddenField);
        
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "month");
        hiddenField.setAttribute("value",month );        
        form.appendChild(hiddenField);
        
        
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "monthType");
        hiddenField.setAttribute("value",monthType );        
        form.appendChild(hiddenField);
        
        document.body.appendChild(form);
        form.submit();
        //end
        
        helper.trackDownloads(component, helper);
    }
    
})