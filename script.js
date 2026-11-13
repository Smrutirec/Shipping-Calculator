
const shippingForm = document.getElementById("shippingForm");

shippingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get customer details
    const sender = document.getElementById("sender").value.trim();
    const receiver = document.getElementById("receiver").value.trim();

    // Get parcel details
    const weight = Number(document.getElementById("weight").value);
    const distance = Number(document.getElementById("distance").value);

    const shippingType = document.getElementById("shippingType").value;

    // Validate input
    if (!sender || !receiver) {
        alert("Please enter sender and receiver names.");
        return;
    }

    if (!Number.isFinite(weight) || weight <= 0 ||
        !Number.isFinite(distance) || distance <= 0) {
        alert("Please enter valid weight and distance.");
        return;
    }

    // Shipping rates
    const baseCharge = 50;
    const weightCharge = weight * 20;
    const distanceCharge = distance * 2;

    // Calculate basic cost
    const basicCost = baseCharge + weightCharge + distanceCharge;

    let multiplier;
    let deliveryTime;
    let method;

    // Select shipping method
    if (shippingType === "standard") {
        multiplier = 1;
        deliveryTime = "5-7 Days";
        method = "Standard Delivery";
    }

    else if (shippingType === "express") {
        multiplier = 1.5;
        deliveryTime = "2-3 Days";
        method = "Express Delivery";
    }

    else {
        multiplier = 2;
        deliveryTime = "1 Day";
        method = "Overnight Delivery";
    }

    // Calculate shipping cost
    const subtotal = basicCost * multiplier;

    // Apply discount
    let discount = 0;

    if (subtotal >= 1000) {
        discount = subtotal * 0.10;
    }

    const finalAmount = subtotal - discount;

    // Display results
    document.getElementById("resultSender").textContent =
        "Sender: " + sender;

    document.getElementById("resultReceiver").textContent =
        "Receiver: " + receiver;

    document.getElementById("resultWeight").textContent =
        "Parcel Weight: " + weight + " kg";

    document.getElementById("resultDistance").textContent =
        "Distance: " + distance + " km";

    document.getElementById("resultMethod").textContent =
        "Shipping Method: " + method;

    document.getElementById("resultDelivery").textContent =
        "Estimated Delivery: " + deliveryTime;

    document.getElementById("resultBase").textContent =
        "Shipping Subtotal: ₹" + subtotal.toFixed(2);

    document.getElementById("resultDiscount").textContent =
        "Discount: ₹" + discount.toFixed(2);

    document.getElementById("finalCost").textContent =
        "Final Shipping Cost: ₹" + finalAmount.toFixed(2);

    document.getElementById("result").hidden = false;

});

// Reset the result when the form is cleared
shippingForm.addEventListener("reset", function() {
    document.getElementById("result").hidden = true;
});
