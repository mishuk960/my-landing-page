// tracking.js

(function () {
  "use strict";

  // --------------------------------
  // 1. Capture UTM parameters
  // --------------------------------

  const params = new URLSearchParams(window.location.search);

  const currentUTM = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || ""
  };


  // --------------------------------
  // 2. Keep previous UTM if visitor
  // returns without UTM parameters
  // --------------------------------

  const savedUTM =
    JSON.parse(localStorage.getItem("affiliate_tracking") || "null");

  const trackingData = {
    utm_source: currentUTM.utm_source || savedUTM?.utm_source || "",
    utm_medium: currentUTM.utm_medium || savedUTM?.utm_medium || "",
    utm_campaign: currentUTM.utm_campaign || savedUTM?.utm_campaign || "",
    utm_content: currentUTM.utm_content || savedUTM?.utm_content || "",
    utm_term: currentUTM.utm_term || savedUTM?.utm_term || ""
  };


  // Save tracking data
  localStorage.setItem(
    "affiliate_tracking",
    JSON.stringify(trackingData)
  );


  // --------------------------------
  // 3. Generate a simple visitor ID
  // --------------------------------

  let visitorId = localStorage.getItem("affiliate_visitor_id");

  if (!visitorId) {
    visitorId =
      "v_" +
      Date.now() +
      "_" +
      Math.random().toString(36).substring(2, 10);

    localStorage.setItem(
      "affiliate_visitor_id",
      visitorId
    );
  }


  // --------------------------------
  // 4. Track affiliate button clicks
  // --------------------------------

  document.addEventListener("click", function (event) {

    const link = event.target.closest(
      "a[data-affiliate]"
    );

    if (!link) return;


    const clickData = {
      visitor_id: visitorId,

      offer: link.dataset.affiliate,

      url: link.href,

      utm_source: trackingData.utm_source,
      utm_medium: trackingData.utm_medium,
      utm_campaign: trackingData.utm_campaign,
      utm_content: trackingData.utm_content,
      utm_term: trackingData.utm_term,

      timestamp: new Date().toISOString()
    };


    // Save latest click locally
    localStorage.setItem(
      "affiliate_last_click",
      JSON.stringify(clickData)
    );


    // Debug / testing
    console.log(
      "Affiliate Click:",
      clickData
    );

  });

})();
