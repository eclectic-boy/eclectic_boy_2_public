function distribute_cms_data(data) {
  let data_ = data.results[0].data;

  $("#cookie_policy_body").html(`${richTextAsHtml(data_.body)}`);
}

$(function() {

  PrismicClient.getDocument(
    "cookie_policy",
    `
		{
			cookie_policy {
				...cookie_policyFields
			}
		}
		`,
    distribute_cms_data
  );

});
