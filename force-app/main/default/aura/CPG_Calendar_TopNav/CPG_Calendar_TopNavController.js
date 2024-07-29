({
            doInit : function(component, event, helper) {
                
                var today = new Date();
                var monthNumber = today.getMonth();// 0- jan, 5-june
                component.set("v.selectedYear", (monthNumber >= 6 ? today.getFullYear() + 1: today.getFullYear()));
                component.set("v.selectedMonthType", "12");
            },
          /*  navigateToHomePage : function(component, event, helper) {
                var address = '/';        
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": address
                });
                urlEvent.fire();
            },
            onClickOfPreviousYear : function(component, event, helper) {
                const minYear = 2017;
                var selectedYear = component.get("v.selectedYear");
                selectedYear = selectedYear ? selectedYear : minYear;
                
                selectedYear -=1;
                
                if(selectedYear<= minYear){
                    component.set('v.isPreviousIconAvailable', false);
                }else if(component.get('v.isNextIconAvailable') == false){
                    component.set('v.isNextIconAvailable', true);
                }
                
                component.set('v.selectedYear', selectedYear);
                helper.fireTopNavChangeEvent(component, helper, "year", selectedYear);
            },
            onClickOfNextYear : function(component, event, helper) {
                const maxYear = 2999;
                var selectedYear = component.get("v.selectedYear");
                selectedYear = selectedYear ? selectedYear : minYear;
                
                selectedYear +=1;
                
                if(selectedYear>= maxYear){
                    component.set('v.isNextIconAvailable', false);
                }else if(component.get('v.isPreviousIconAvailable') == false){
                    component.set('v.isPreviousIconAvailable', true);
                }
                
                component.set('v.selectedYear', selectedYear);
                helper.fireTopNavChangeEvent(component, helper, "year", selectedYear);
            },*/
            onMonthTypeChange : function(component, event, helper) {
                
                var dataset =  event.currentTarget.dataset;
                var selectedMonthType = dataset.monthtype;
                var headerChangeViewGrid='';
                var existingMonthType = component.get("v.selectedMonthType");
                if(selectedMonthType != existingMonthType){
                    if(existingMonthType=='12' && (selectedMonthType=='6' || selectedMonthType=='3')
                       ||existingMonthType=='6' && selectedMonthType=='3'
                       ||((existingMonthType=='6' || existingMonthType=='3') && selectedMonthType=='12')
                       ||existingMonthType=='3' && selectedMonthType=='6'){
                        headerChangeViewGrid='true';
                    }else{
                        headerChangeViewGrid='false';
                    }
                    component.set("v.selectedMonthType",selectedMonthType );
                    helper.fireTopNavChangeEvent(component, helper, "monthType", selectedMonthType,headerChangeViewGrid);
                }
            },
         /*   onDownloadPdf : function(component, event, helper) {
                var componentEvent = component.getEvent("OCDownloadPdf");
                componentEvent.fire();
            }*/
        })