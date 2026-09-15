// tracking.js

(function () {
  const params = new URLSearchParams(window.location.search);

  const trackingData = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
  };

  // Save UTM parameters for the current visitor
  localStorage.setItem(
    "affiliate_tracking",
    JSON.stringify(trackingData)
  );

  // Track clicks on affiliate links
  document.addEventListener("click", function (event) {
    const link = event.target.closest("a[data-affiliate]");

    if (!link) return;

    const clickData = {
      offer: link.dataset.affiliate,
      url: link.href,
      tracking: trackingData,
      timestamp: new Date().toISOString()
    };

    console.log("Affiliate Click:", clickData);
  });
})();
