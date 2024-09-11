import React from "react";
import Link from "../../components/MUIComponent/Link";
import A from "../../common/assets";

const GoBack = (props) => {
    return (
        <Link href={props.url} color={A.colors.black}>
            <i class="fa-solid fa-arrow-left fa-xl"></i>
        </Link>
    );
}
export default GoBack;