<?php
// Private mail settings for the contact forms (wp-content/themes/ats-site/api/lead.php).
// Save as atsru-lead-config.php one level ABOVE the WordPress root, never inside it:
//   /www/atsru-lead-config.php          <- this file
//   /www/aviatechnosoft.ru/wp-config.php <- WordPress root
// Do not commit the real file. ATS_LEAD_TO / ATS_LEAD_FROM environment variables override it.
return [
    // Where requests are delivered.
    'to' => 'liap1990@gmail.com',
    // Sender: a mailbox on the site's own domain that the hosting may send from (SPF/DKIM).
    // Never use @gmail.com or @yandex.ru here.
    'from' => 'no-reply@aviatechnosoft.ru',
];
