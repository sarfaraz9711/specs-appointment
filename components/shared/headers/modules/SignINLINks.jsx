import Link from "next/link";
//import {ConnectPlugin} from '../../../connectPlugins';
import React from "react";
import { useTranslation } from "../../../../i18n";

function SignINLINks() {
  const { t } = useTranslation("common");
  return (
    <>
<li><Link href="/account/login"><a>{t("Shared.SignIn")}</a></Link></li>
<li><Link href="/account/register"><a>{t("Shared.SignUp")}</a></Link></li>
    </>
  );
}
export default SignINLINks;
