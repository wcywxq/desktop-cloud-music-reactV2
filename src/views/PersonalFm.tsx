import * as React from "react"
import { useState } from "reinspect";

const PersonalFm: React.FC = () => {
    const [data, setData] = useState('', '数据');

    return (
        <div className="personal-fm">
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    )
};

export default PersonalFm
