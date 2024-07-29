({
   doInit : function(component, event, helper) {
       console.log('in header brand id-->'+component.get("v.brandVariantID"));   
       helper.getDSSlogos(component, event, helper,component.get("v.brandVariantID"));
       var parsedUrl = new URL(window.location.href);
       var accountId = parsedUrl.searchParams.get("accountId");
       helper.getAccountStates(component, event, helper,accountId);
       
   },	
    
    handleClickMenu : function(component, event, helper){
        var iconName = component.get("v.iconName");
        if(iconName === "threedots")
            component.set("v.iconName", "closedots");
        else
            component.set("v.iconName", "threedots");
        var menu = component.find("menulist");
        $A.util.toggleClass(menu, "slds-is-open");
        
    },
    handleClickSmallMenu : function(component, event, helper){
        var menu = component.find("smallHamburger");
        $A.util.toggleClass(menu, "slds-hide");
        
    },
    
    changeTab : function(component, event, helper){
        component.set("v.activePage",event.currentTarget.dataset.tabname);
        console.log(event.currentTarget.dataset.tabname);
        component.set("v.slideIndex",event.currentTarget.dataset.index);
         console.log(event.currentTarget.dataset.index);
        
    },
    changeTabSmall : function(component, event, helper){
        component.set("v.activePage",event.currentTarget.dataset.tabname);
        component.set("v.slideIndex",event.currentTarget.dataset.index);
        console.log(event.currentTarget.dataset.tabname);
        console.log(event.currentTarget.dataset.index);
        var menu = component.find("smallHamburger");
        $A.util.addClass(menu, "slds-hide");
    },
      
   
})