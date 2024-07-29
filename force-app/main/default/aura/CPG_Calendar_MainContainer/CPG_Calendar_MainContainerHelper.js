({
    refreshView: function(component,helper){
        debugger;
        
        var isDetailsCmpActive = component.get("v.isDetailsCmpActive");
        
        var calendarDetails = component.get("v.calendarDetails")|| [];
        calendarDetails.splice(0,calendarDetails.length);
        component.set("v.calendarDetails", calendarDetails);
        
        var sideFilter = component.get("v.selectedFilters");
        if(isDetailsCmpActive == true){ // call calendar details/ grouped calendars
            helper.requestToChangeHeaderConfig(component,helper);
            
            
            var isLoadingMap =component.get("v.isLoadingMap");
            isLoadingMap = isLoadingMap ? isLoadingMap :{};
            isLoadingMap.isDetails = true;
            component.set("v.isLoadingMap",isLoadingMap);
            
            var parameters ={
                "year": component.get("v.selectedYear"),
                "month": component.get("v.selectedMonth"),
                "monthType" : component.get("v.selectedMonthType"),
                "group1":component.get("v.selectedGroup1"),
                "group2": component.get("v.selectedGroup2"),
                "jsonFilterString": (sideFilter ? JSON.stringify(sideFilter) : null),
                "isCalculateGap": component.get("v.isGapCalendarActive") 
            };
            var apexConfig={
                "parameters" : parameters,
                "isBackGround" : false
            };
            var callBackConfig ={
                "callBackParams" :{'requestTime': performance.now()},
                "disableExceptionHandling": false,
                "enableCallbackOnException": true,
                "exceptionHandler": helper.exceptionHandler
            };
            helper.callApexMethod(component,helper,"getCalendarDetails",apexConfig,helper.resultCallBack_Details,callBackConfig);
            
        }else{ //call summary data 
            var isLoadingMap =component.get("v.isLoadingMap");
            isLoadingMap = isLoadingMap ? isLoadingMap :{};
            isLoadingMap.isSummary = true;
            component.set("v.isLoadingMap",isLoadingMap);
            
            var parameters ={
                "year":component.get("v.selectedYear"),
                "monthType": component.get("v.selectedMonthType"),
                "jsonFilterString": (sideFilter ? JSON.stringify(sideFilter): null),
                "isColorCodingRequired" : false
            };
            var apexConfig={
                "parameters" : parameters,
                "isBackGround" : false
            };
            var callBackConfig ={
                "callBackParams" :{},
                "disableExceptionHandling": false,
                "enableCallbackOnException": true,
                "exceptionHandler": helper.exceptionHandler
            };
           // helper.callApexMethod(component,helper,"getCalendarSummary",apexConfig,helper.resultCallBack_Summary,callBackConfig);
            
        }
        
    },
    resultCallBack_Summary : function(component,helper,response){
        var result = response.getReturnValue();
        var summaryData = result.summaryData;
        
        /*var colorCodeData = result.colorCodeData;
        if(colorCodeData){
            var mapOfOrderedTypes={};
            var mapOfColorCodes={};
            
            for(var masterType in colorCodeData){
                mapOfOrderedTypes[masterType] = [];
                
                for(var i in colorCodeData[masterType]){
                    mapOfOrderedTypes[masterType].push(colorCodeData[masterType][i].label);
                    mapOfColorCodes[colorCodeData[masterType][i].label] = colorCodeData[masterType][i].colorCode;
                }
            }
            
            component.set("v.mapOfOrderedTypes", mapOfOrderedTypes);
            component.set("v.mapOfColorCodes", mapOfColorCodes);
            
            const distinctPromotionalCalendarTypes = result.promotionalCalendarTypes;
            let orderedPromotionalCalendarTypes = [];
            if(distinctPromotionalCalendarTypes){
                for(var i in mapOfOrderedTypes['Program Type']){
                    
                    if(distinctPromotionalCalendarTypes.includes(mapOfOrderedTypes['Program Type'][i])){
                        orderedPromotionalCalendarTypes.push(mapOfOrderedTypes['Program Type'][i]);
                    }
                }
            }
            
            component.set("v.promotionalCalendarTypes", orderedPromotionalCalendarTypes);
            component.set("v.programTypeDescription", result.programTypeDescription || {});
        }
        */
        
        helper.createCalendarSummaryData(component,helper,summaryData);
        
    },
    createCalendarSummaryData : function(component,helper, summaryData){
        //debuuger;
        var selectedMonthType = component.get("v.selectedMonthType");
        var monthList = component.get("v.monthListMap")[selectedMonthType];
        var monthPrefix = component.get("v.monthPrefix");
        
        var programTypesInOrder = component.get("v.mapOfOrderedTypes")['Program Type'];
        var programTypeColorCodeObj = component.get("v.mapOfColorCodes");
        var programTypeDescription = component.get("v.programTypeDescription");
        
        var calendarSummary =[];
        for(var monthIndex= 0 ; monthIndex< monthList.length; monthIndex++){
            //for(var monthIndex in monthList){
            var monthStr = monthList[monthIndex];
            
            var programList =[];
            //for(var programTypeIndex in programTypesInOrder){
            for(var programTypeIndex= 0 ; programTypeIndex< 2; programTypeIndex++){
                var programType = programTypesInOrder[programTypeIndex];
                
                var noOfCalendars_mod = (summaryData[monthStr] ? summaryData[monthStr][programType] : 0);
                noOfCalendars_mod = noOfCalendars_mod ? noOfCalendars_mod :0;
                var description = monthIndex != 0 ? null: programTypeDescription[programType];
                
                programList.push({
                    "name" : programType,
                    "color" : programTypeColorCodeObj[programType],
                    "noOfCalendars": noOfCalendars_mod,
                    "description" : description
                });
            }
            
            calendarSummary.push({
                name: monthStr,
                prefix : monthPrefix[monthStr],
                linkedItems : programList
            });
        }
        
        component.set("v.calendarSummary", calendarSummary);
        
        var isLoadingMap =component.get("v.isLoadingMap");
        isLoadingMap = isLoadingMap ? isLoadingMap :{};
        isLoadingMap.isSummary = false;
        component.set("v.isLoadingMap",isLoadingMap);
    },
    resultCallBack_Details : function(component,helper,response, callBackParams){
        
        var isDataFromCache = false;
        if(performance.now() - callBackParams.requestTime < 100){// check for cache or back end
            isDataFromCache = true;
        }
        
        var result = response.getReturnValue();
        
        component.set("v.brandColorCodes", result.brandColorCodes);
        if(isDataFromCache == true){
            window.setTimeout(function(){
                helper.createCalendarDetailsData(component,helper, result.groupedCalendars, isDataFromCache);
            },1000);
        }else{
            helper.createCalendarDetailsData(component,helper, result.groupedCalendars, isDataFromCache);
        }
        
    },
    createCalendarDetailsData: function(component,helper, groupedData, isDataFromCache){
        var mapOfOrderedTypes = component.get("v.mapOfOrderedTypes");
        var brandColorCodes = component.get("v.brandColorCodes");
        var mapOfColorCodes = component.get("v.mapOfColorCodes");
        var isGapCalendarActive = component.get("v.isGapCalendarActive");
        var promotionalCalendarTypes = component.get("v.promotionalCalendarTypes");
        var channelIconMap = component.get("v.channelIconMap");
        
        var group1 = component.get("v.selectedGroup1") || 'Dummy';
        var group2 = component.get("v.selectedGroup2") || 'Program Type';
        
        var listOfGroupedCalendars =[];
        //group1
        var group1DataKeys = helper.sortingGroupingData(component, helper, group1, mapOfOrderedTypes,groupedData);
        
        var groupedCalendars = [];
        for(var group1Index in group1DataKeys){
            
            var group1Data_obj = groupedData[group1DataKeys[group1Index]];
            
            if(group1Data_obj){
                //group2
                var group2DataKeys = helper.sortingGroupingData(component, helper, group2,mapOfOrderedTypes,group1Data_obj );
                var group1_list = [];
                for(var group2Index in group2DataKeys){
                    
                    var group2Data_obj = group1Data_obj[group2DataKeys[group2Index]];
                    group2Data_obj = helper.sortcalendars(component, helper,group2Data_obj);
                    /*if(isGapCalendarActive == true)
                    	group2Data_obj = helper.calculateGapCalendars(component, helper,group2Data_obj, promotionalCalendarTypes);
					*/
                    var isINSalesChannelActive = false;
                    var listOfChannels =[];
                    if(group2 == 'Program Type' && group2DataKeys[group2Index] == 'Innovation'){
                        listOfChannels = helper.calculateInnovationChannels(component, helper,group2Data_obj,mapOfOrderedTypes["IN Sales Channel"],channelIconMap);
                        isINSalesChannelActive = true;
                    }
                    
                    if(group2Data_obj){
                        
                        if(group2 == 'Brand'){
                            var brandName = group2DataKeys[group2Index];
                            var colorData = (brandColorCodes[brandName] ? brandColorCodes[brandName][0] : '') || mapOfColorCodes["DefaultColor_Brand"] || '#515151';
                            colorData = colorData.charAt(0) != '#' ? '#'+colorData : colorData;
                            var fontColor = helper.getCalculatedFontColor(component,helper,colorData);
                            
                            group1_list.push({"name": brandName.substring(0,brandName.lastIndexOf('\t')) , "color":colorData , "fontColor" : fontColor, "linkedItems" :group2Data_obj });
                        }else{
                            var group2Name = group2DataKeys[group2Index];
                            var colorData = mapOfColorCodes[group2Name] || mapOfColorCodes["DefaultColor_"+group2] || '#515151';
                            var fontColor = helper.getCalculatedFontColor(component,helper,colorData);
                            group1_list.push({"name": group2Name, "color":colorData, "fontColor" : fontColor,
                                              "isINSalesChannelActive":isINSalesChannelActive ,"listOfChannels":listOfChannels , 
                                              "linkedItems" :group2Data_obj });
                        }
                        
                    }
                }
                if(group1 == 'Brand'){
                    var brandName = group1DataKeys[group1Index];
                    groupedCalendars.push({name: brandName.substring(0,brandName.lastIndexOf('\t')), linkedItems :group1_list });
                }else{
                    groupedCalendars.push({name: group1DataKeys[group1Index], linkedItems :group1_list });
                }
            }
        }
        
        var batchLoader= function(attributeName, inputList,startIndex,noOfItems, is2Grouped){
            inputList = inputList || [];
            startIndex = startIndex || 0;
            noOfItems = noOfItems || 2;
            is2Grouped = is2Grouped ? is2Grouped : false;
            
            let isLoadingMap =component.get("v.isLoadingMap");
            if((is2Grouped == true && startIndex >= inputList.length)
               ||(is2Grouped == false && startIndex >= inputList[0].linkedItems.length)
               || isLoadingMap.isDetails == true){
                //component.set("v.isTagLoading",false);
            }
            else{
                if(is2Grouped == false){ // only one grouping, group2 have to be batched
                    var group2List = inputList[0].linkedItems;
                    var batch = group2List.slice(startIndex,startIndex+noOfItems);
                    
                    var attributeValue = component.get(attributeName);
                    var group2Value = attributeValue[0].linkedItems || [];
                    
                    group2Value = group2Value.concat(batch);
                    attributeValue[0].linkedItems =  group2Value;
                    
                    component.set(attributeName,attributeValue);
                    
                }else{
                    var batch = inputList.slice(startIndex,startIndex+noOfItems);
                    var attributeValue = startIndex > 0 ? component.get(attributeName) : [];
                    attributeValue = attributeValue.concat(batch);
                    component.set(attributeName,attributeValue);
                }
                
                setTimeout($A.getCallback(batchLoader),1,attributeName,inputList,startIndex+noOfItems,noOfItems, is2Grouped);
            }
        }
        
        
        var isLoadingMap =component.get("v.isLoadingMap");
        isLoadingMap = isLoadingMap ? isLoadingMap :{};
        isLoadingMap.isDetails = false;
        component.set("v.isLoadingMap",isLoadingMap);
        
        if(group1 == 'Dummy' ){// only one grouping
            
            var calendarDetails = [{
                "name" : groupedCalendars[0]["name"],
                "linkedItems": []
            }
                                  ];
            
            component.set("v.calendarDetails",calendarDetails);
            batchLoader("v.calendarDetails",groupedCalendars,0,1, false);
            
        }else{
            batchLoader("v.calendarDetails",groupedCalendars,0,1, true);
        }
        //component.set("v.calendarDetails", groupedCalendars);
    },
    sortingGroupingData : function(component, helper, groupingType,mapOfOrderedTypes, groupedData){
        
        switch(groupingType){
            case 'Dummy':
                return ['Dummy'];
                break;
                
            case 'Program Type':
            case 'Launch Scale':
            case 'Channel':
                return mapOfOrderedTypes[groupingType];
                
                break;
                
            case 'Brand':
                var allBrandNames = Object.keys(groupedData);
                allBrandNames.sort();
                return allBrandNames;
                break;
                
        }
    },
    sortcalendars : function(component, helper, calendarList){
        var compareCalendars = function(item1, item2){
            var priority1 = parseInt(item1.priority);
            var priority2 = parseInt(item2.priority);
            
            priority1 = isNaN(priority1) ==true ? 99:  priority1;
            priority2 = isNaN(priority2) ==true ? 99:  priority2;
            
            var priorityDiff = priority1 - priority2;
            if(priorityDiff == 0){
                var name1 = item1.name.toUpperCase();
                var name2 = item2.name.toUpperCase();
                
                if(name1 < name2){
                    return -1;
                }else if(name1 > name2){
                    return 1;
                }else{
                    return 0;
                }
            }else{
                return priorityDiff;
            }
        }
        
        if(calendarList){
            calendarList.sort(compareCalendars);
        }
        return calendarList;
    },
    calculateGapCalendars : function(component, helper, calendarList, promotionalCalendarTypes){
        if(calendarList){
            for(var i in calendarList){
                calendarList[i].isGapCalendar = false;
                
                if(! promotionalCalendarTypes.includes(calendarList[i].programType)){
                    for(var j in promotionalCalendarTypes){
                        var promotions = calendarList[i].promotions[promotionalCalendarTypes[j]];
                        if(!promotions || promotions.length == 0){
                            calendarList[i].isGapCalendar = true;
                            break;
                        }
                    }
                }
            }
        }
        return calendarList;
    },
    getCalculatedFontColor : function(component, helper, colorCode) {
        
        colorCode = colorCode.substring(1,colorCode.length);
        var red,green,blue;
        try{
            if(colorCode.length >4){
                red = parseInt(colorCode.substring(0,2), 16);
                green = parseInt(colorCode.substring(2,4), 16);
                blue = parseInt(colorCode.substring(4,6), 16);
            }else{
                red = parseInt(colorCode.substring(0,1) +colorCode.substring(0,1), 16);
                green = parseInt(colorCode.substring(1,2) + colorCode.substring(1,2), 16);
                blue = parseInt(colorCode.substring(2,3) + colorCode.substring(2,3), 16);
            }
        }catch(e){}
        
        red = isNaN(red) ? 0 : red;
        green = isNaN(green) ? 0 : green;
        blue = isNaN(blue) ? 0: blue;
        
        var luminous = 0.3*red + 0.59*green + 0.11*blue;
        if(luminous <127.5) // dark color
            return '#FFFFFF';
        
        return '#000000';
    },
    calculateInnovationChannels : function(component, helper, calendarList, innovationChannelsInOrder,channelIconMap){
        
        if(!calendarList){
            return [];
        }
        const defaultIcon = 'upNavigationWhite';
        
        var channelIndex ={};
        
        var listOfChannels =[];
        for(var i in innovationChannelsInOrder){
            var iconSet = channelIconMap[innovationChannelsInOrder[i]] || [];
            
            listOfChannels.push({"name":innovationChannelsInOrder[i], "noOfCalendars":0 ,
                                 "icon":(iconSet[0] || defaultIcon),
                                 "iconActive":(iconSet[1] || defaultIcon),
                                 "isActive":false});
            channelIndex[ innovationChannelsInOrder[i] ] = i;
        }
        
        for(var i in calendarList){
            var salesChannel =  calendarList[i].salesChannel;
            var iconSet = channelIconMap[salesChannel] ||[];
            calendarList[i].icon = iconSet[0] || defaultIcon;
            calendarList[i].iconActive = iconSet[1] || defaultIcon;
            
            var index = channelIndex[salesChannel];
            if(salesChannel && (index || index == 0)){
                listOfChannels[index].noOfCalendars++;
            }
        }
        
        return listOfChannels;
    },
    requestToChangeHeaderConfig : function(component, helper){
        var detailCmp = component.find("landingCmpId");
        if(detailCmp){
            var selectedMonthType = component.get("v.selectedMonthType");
            var selectedYear = component.get("v.selectedYear");
            var selectedMonth = component.get("v.selectedMonth");//added by bharat P4
            
            detailCmp.configureHeaderRequest(selectedYear,selectedMonthType,selectedMonth );
        }
    },
    //call apex method
    callApexMethod : function(component,helper,methodName,apexConfig,resultCallBack,callBackConfig) {
        //helper.callApexMethod(component,helper,"getCalendarSummary",apexConfig,helper.resultCallBackSummary,callBackConfig);
        apexConfig = apexConfig ? apexConfig : {};
        
        callBackConfig = callBackConfig ? callBackConfig : {};
        
        var parameters = apexConfig.parameters;
        var isBackGround = apexConfig.isBackGround;
        
        var callBackParams = callBackConfig.callBackParams;
        var disableExceptionHandling = callBackConfig.disableExceptionHandling;
        var enableCallbackOnException = callBackConfig.enableCallbackOnException;
        
        disableExceptionHandling = (disableExceptionHandling == true) ? true : false;
        enableCallbackOnException = (enableCallbackOnException == true) ? true: false;
        
        if(!methodName.startsWith('c.')){
            methodName = 'c.'+methodName;
        }
        var action = component.get(methodName);
        if(parameters && Object.keys(parameters).length>0){
            action.setParams(parameters);
        }
        if(isBackGround == true){
            action.setBackground();
        }
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                debugger;
                //var result = JSON.parse(response.getReturnValue());
                var result = response.getReturnValue();
        		var summaryData = result.summaryData;
                var selectedMonthType = component.get("v.selectedMonthType");
        var monthList = component.get("v.monthListMap")[selectedMonthType];
        var monthPrefix = component.get("v.monthPrefix");
        
        //var programTypesInOrder = component.get("v.mapOfOrderedTypes")['Program Type'];
        var programTypeColorCodeObj = component.get("v.mapOfColorCodes");
        var programTypeDescription = component.get("v.programTypeDescription");
        
        var calendarSummary =[];
        for(var monthIndex= 0 ; monthIndex< monthList.length; monthIndex++){
            //for(var monthIndex in monthList){
            var monthStr = monthList[monthIndex];
            var Calendar_RecordTypes=['Promotions','Activations','Events','Marketing Program'];
            var programList =[];
            //for(var programTypeIndex in programTypesInOrder){
             for(var caltype=0;caltype<Calendar_RecordTypes.length;caltype++){

               // var programType = programTypesInOrder[programTypeIndex];
                
                var noOfCalendars_mod = (summaryData[monthStr] ? summaryData[monthStr][Calendar_RecordTypes[caltype]] : 0);
                noOfCalendars_mod = noOfCalendars_mod ? noOfCalendars_mod :0;
                //var description = monthIndex != 0 ? null: programTypeDescription[programType];
                
                programList.push({
                    "noOfCalendars": noOfCalendars_mod,
                    "name":Calendar_RecordTypes[caltype]
                });
            }
            
            calendarSummary.push({
                name: monthStr,
                prefix : monthPrefix[monthStr],
                linkedItems : programList
            });
        }
        
        component.set("v.calendarSummary", calendarSummary);
        
        var isLoadingMap =component.get("v.isLoadingMap");
        isLoadingMap = isLoadingMap ? isLoadingMap :{};
        isLoadingMap.isSummary = false;
        component.set("v.isLoadingMap",isLoadingMap);
            }
            /*if(!disableExceptionHandling){
                if (state === "ERROR") {
                    var errors = response.getError();
                    if(errors){
                        errors = errors[0];
                        if(errors.message && errors.message.includes('Insufficient Privileges')){
                            this.showToast('',errors.message);
                            this.redirectToUrl('/');
                        }else if(errors.exceptionType && errors.exceptionType.includes('System.LimitException')){
                            this.showToast('Seems like we are hitting the Limits!','Please apply some Filters');
                        }else{
                            this.showToast('Something Went Wrong!','Something Went Wrong, Please Try Again!');
                        }
                    }
                    console.error(JSON.stringify(errors));
                }else if(state !== "SUCCESS"){
                    this.showToast('NetWork Error','Something Went Wrong, Please Try Again!');
                }
            } 
            
            if(state === "SUCCESS" || (state !== "SUCCESS" && disableExceptionHandling == true))
                resultCallBack(component,helper,response,callBackParams);
            else if( state !== "SUCCESS" && enableCallbackOnException )
                callBackConfig.exceptionHandler(component,helper);*/
        });
        $A.enqueueAction(action);
    },
    exceptionHandler: function(component,helper){
        
        var isLoadingMap =component.get("v.isLoadingMap");
        isLoadingMap = isLoadingMap ? isLoadingMap :{};
        isLoadingMap.isDetails = false;
        isLoadingMap.isSummary = false;
        component.set("v.isLoadingMap",isLoadingMap);
        
        if(component.get("v.isDetailsCmpActive") ==true){
            component.set("v.isDetailsCmpActive", false);
            component.set("v.isGapCalendarActive", false);
            
            var detailCmp = component.find("landingCmpId");
            if(detailCmp){
                detailCmp.activateOrDeativateDetailView(false);
            }
        } 
        /* if(component.get("v.isDetailsCmpActive") ==true){
            component.set("v.isDetailsCmpActive", true);
            component.set("v.isGapCalendarActive", true);
            
            var detailCmp = component.find("landingCmpId");
            if(detailCmp){
                detailCmp.activateOrDeativateDetailView(true);
            }
        }*/
    },
    
    //redirect to url
    redirectToUrl: function(address){
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": address
        });
        urlEvent.fire();
    },
    // show toast message
    showToast: function(title,message,type) {
        type = type ? type :'error';
        var showToast = $A.get("e.force:showToast"); 
        showToast.setParams({ 
            'title' : title, 
            'message' : message, 
            'type': type
        }); 
        showToast.fire(); 
    },
   
    listOfMonthsMethod :  function(component, event,helper,monthNumber){
        debugger;
        var action = component.get("c.getListOfMonths");
        action.setParams({
            "monthNumber": monthNumber,
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
               var result = response.getReturnValue(); 
                debugger;
                component.set("v.listOfMonths",result);
                 var monthListMap ={
            "12" : component.get("v.listOfMonths"),
            "6"  : ['Jul - Dec','Jan - Jun'],
            "3"	 : ['Jul - Sep', 'Oct - Dec', 'Jan - Mar', 'Apr - Jun']
        };
        component.set("v.monthListMap",monthListMap);
            }
        });
        $A.enqueueAction(action);
    }
    
})