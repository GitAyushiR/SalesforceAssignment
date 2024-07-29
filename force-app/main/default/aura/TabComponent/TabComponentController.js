({
   
    changeTab : function(component, event, helper){
        component.set("v.activePage",event.currentTarget.dataset.tabname);
        component.set("v.slideIndex",event.currentTarget.dataset.index);
        var menu = component.find("smallsidemenu");
        $A.util.addClass(menu, "slds-hide");
    },
    
    ClickSmallMenu : function(component, event, helper){
        var menu = component.find("smallsidemenu");
        $A.util.toggleClass(menu, "slds-hide");
        
    },
    Tab : function(component, event, helper){
        component.set("v.activePage",event.currentTarget.dataset.tabname);
        component.set("v.slideIndex",event.currentTarget.dataset.index);
        
    },
    fruitsTab: function(component, event, helper) {
        helper.clearAll(component, event);
        //make fruits tab active and show tab data
        component.find("fruitId").getElement().className = 'slds-tabs--scoped__item slds-active customClassForTab';
        component.find("fruTabDataId").getElement().className = 'slds-tabs--scoped__content slds-show customClassForTabData';
    },
    vegeTab: function(component, event, helper) {
        helper.clearAll(component, event);
        //make vegetables tab active and show tab data
        component.find("VegeId").getElement().className = 'slds-tabs--scoped__item slds-active customClassForTab';
        component.find("vegeTabDataId").getElement().className = 'slds-tabs--scoped__content slds-show customClassForTabData';
    },
    colorTab: function(component, event, helper) {
        helper.clearAll(component, event);
        //make color tab active and show tab data
        component.find("ColorId").getElement().className = 'slds-tabs--scoped__item slds-active customClassForTab';
        component.find("ColorTabDataId").getElement().className = 'slds-tabs--scoped__content slds-show customClassForTabData';
    },
    HeritagePage: function(component, event, helper) {
        helper.clearAll(component, event);
          component.set("v.condition",true);
      },     

    keybenefits:function(component, event, helper) {
        helper.clearAll(component, event);
          component.set("v.condition1",true);
      }    
})