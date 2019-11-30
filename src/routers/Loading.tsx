import * as React from 'react';
import { Spin } from 'antd';

interface StyleTypes {
    [propName: string]: React.CSSProperties
}


interface LoadingProps {
    isLoading: boolean
    error: any
}

const styles: StyleTypes = {
    loadingBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export const Loading: React.FC<LoadingProps> = (props) => {
    const { isLoading, error } = props;

    // Handle the loading state
    if (isLoading) {
        return (
            <div style={styles.loadingBox}>
                <Spin tip="Loading..."/>
            </div>
        )
    } else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    } else {
        return null;
    }
};
