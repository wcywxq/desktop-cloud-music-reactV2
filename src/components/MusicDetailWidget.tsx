import * as React from "react";
import { Drawer } from 'antd'

interface IProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MusicDetail: React.FC<IProps> = (props) => {
    const { visible, setVisible } = props;
    return (
        <div style={{ position: 'relative' }}>
            <Drawer
                title="Basic Drawer"
                placement="bottom"
                closable={false}
                visible={visible}
                height={document.body.offsetHeight - 52}
                zIndex={9}
                onClose={() => setVisible(false)}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    )
};

export default MusicDetail
