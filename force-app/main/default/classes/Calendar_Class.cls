public class Calendar_Class {
    
    public static final List<String> monthList= new List<String>{'','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'};
    	@auraEnabled
        public static Map<String, Object> getCalendar(Integer year){
            try{
                Map<String, Map<String, Integer>> summaryData = (Map<String, Map<String, Integer>>) calculateSummaryOrDetails(true, year);
            	Map<String, Object> returnObj = new Map<String, Object>{'summaryData' => summaryData};
                    return returnObj ;
            }
            catch(Exception ex){
                  System.debug('EXCEPTION in TSP_OC_CalendarController -- Message:'+ex.getMessage() + ' StackTrace:'+ex.getStackTraceString());
            	  return null; 
            }
        /*List<Calendar__c> calendar = [Select Id , Name,	Start_Date__c,End_Date__c, Channel__c from Calendar__c];
        System.debug('calendar>>>>>'+calendar);
        getActiveCalendarMonths(calendar[0].Start_Date__c,calendar[0].End_Date__c , 2020);*/
    }
    private static Object calculateSummaryOrDetails(Boolean isCalculateSummary , Integer year){
        System.debug('isCalculateSummary>>>'+isCalculateSummary);
        System.debug('year>>>>'+year);
        Map<String, Map<String, Integer>> finalMap = new Map<String, Map<String, Integer>>();
                Map<String, Integer> map_programType;
                Integer noOfCalendars ;
        for(Calendar__c calen : [Select Id , Name,RecordType.Name,Start_Date__c,End_Date__c, Channel__c from Calendar__c]){
            Date calendarStartDate = calen.Start_Date__c;
            Date calendarEndDate = calen.End_Date__c;
            String Calendar_RecordType = calen.RecordType.Name;
            system.debug('Calendar_RecordType'+Calendar_RecordType);
            for(String monthStr : getActiveCalendarMonths(calendarStartDate, calendarEndDate, year)){
                                map_programType = finalMap.get(monthStr);
                                
                                if(map_programType == NULL){
                                    map_programType = new Map<String, Integer> ();
                                    finalMap.put(monthStr, map_programType);
                                }
                                
                                noOfCalendars = map_programType.get(Calendar_RecordType);
                                if(noOfCalendars == null){
                                    noOfCalendars = 0;
                                }
                                noOfCalendars += 1;
                                map_programType.put(Calendar_RecordType, noOfCalendars);
                            }
            
                }
        return finalMap;
    }
    public static List<String> getActiveCalendarMonths(Date calendarStartDate, Date calendarEndDate, Integer year){
        System.debug('calendarStartDate>>>'+calendarStartDate);
        System.debug('calendarEndDate>>>>>'+calendarEndDate);
        System.debug('year>>>>'+year);
        //System.debug('monthType>>>>'+monthType);
        try{
				List<String> activeCalendarMonths = new List<String>();
           for(Integer monthNumber =1; monthNumber<=12 ;++monthNumber){
                    
                    Date startDate = Date.newInstance(year, monthNumber, 1);
                    Date endDate =  Date.newInstance(year, monthNumber, Date.daysInMonth(year, monthNumber));
                    
                    if(    (calendarStartDate >= startDate && calendarStartDate <= endDate) 
                       || (calendarEndDate  <= endDate && calendarEndDate  >= startDate) 
                       || (calendarEndDate  >= endDate && calendarStartDate <= startDate) ){
                           activeCalendarMonths.add(monthList[monthNumber]);
                       }
                }
            System.debug('activeCalendarMonths>>>>'+activeCalendarMonths);
			return activeCalendarMonths;            
        }
        catch(Exception ex){
            System.debug('EXCEPTION in Calendar_Class -- Message:'+ex.getMessage() + ' StackTrace:'+ex.getStackTraceString());
            return null;
        }
    }
    
   @auraEnabled
    public static List<String> getListOfMonths(String monthNumber){
        System.debug('monthNumber>>>>'+monthNumber);
        try{
				List<String> calendarMonthsList = new List<String>();
           List<Calendar_Months__c> custData =[Select Id,Name,month_Name__c,monthNumber__c from Calendar_Months__c where monthNumber__c =:monthNumber ORDER BY Name];
            system.debug('custData'+custData);
            for(Calendar_Months__c values : custData){
                calendarMonthsList.add(values.month_Name__c);
             }
            system.debug('calendarMonthsList'+calendarMonthsList);
			return calendarMonthsList;            
        }
        catch(Exception ex){
            System.debug('EXCEPTION in Calendar_Class -- Message:'+ex.getMessage() + ' StackTrace:'+ex.getStackTraceString());
            return null;
        }
    }
}