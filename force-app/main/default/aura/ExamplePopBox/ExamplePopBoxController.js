({

    doInit: function(component, event, helper) {
        var action = component.get("c.getUserList");

        action.setCallback(this, function(result){

            var users = result.getReturnValue();

            component.set("v.users", users);

        });

        $A.enqueueAction(action);

    } ,

    onChangeVal:function (component, event, helper) {

        var val = event.getSource().get("v.value");

        console.log('val'+val);

        var action = component.get("c.getSelectedUser");

        action.setParams({"sname":val});

        action.setCallback(this, function(result){

            var users = result.getReturnValue();

            component.set("v.uSelected", users);

        });

        $A.enqueueAction(action);

    },

})