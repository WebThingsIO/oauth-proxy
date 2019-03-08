const continueButton = document.getElementById('continue-button');
const subdomain = document.getElementById('subdomain');

subdomain.addEventListener('input', function() {
  if (validateDomain()) {
    continueButton.disabled = false;
  } else {
    continueButton.disabled = true;
  }
});
subdomain.addEventListener('keydown', submitOnEnter);

/**
 * Ensure that subdomain is valid:
 * - Contains only a-z, 0-9, and hyphens, but does not start or end with
 *   hyphen.
 * - Is not equal to "api", "www", or "ns\d*", as those are reserved.
 */
function validateDomain() {
  const val = subdomain.value.toLowerCase();
  const re = new RegExp(/^([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$/);
  const nsRegex = new RegExp(/^ns\d*$/);
  if (!re.test(val) ||
      nsRegex.test(val) ||
      ['api', 'www'].includes(val) ||
      val.length > 63) {
    return false;
  }

  return true;
}

function submitOnEnter(event) {
  if (event.key === 'Enter' && validateDomain()) {
    submit();
    event.preventDefault();
  }
}

function submit() {
  const base = `https://${subdomain.value}.mozilla-iot.org/oauth/authorize`;
  window.location = base + window.location.search;
}

continueButton.addEventListener('click', submit);
