trigger orderTrg on Order (before update) {
    OrderItemUtility.addBonusBouquet(trigger.new);
}