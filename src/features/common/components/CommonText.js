import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

const CommonText = (props) => {

    return (
        <Text numberOfLines={null} style={[{ fontSize: props.size, color: props.color }, props.style]}>
            {`${props.text}`}
        </Text>
    )
};

CommonText.propTypes = {
    weight: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    style: View.propTypes.style,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

CommonText.defaultProps = {
    weight: 'regular',
    size: 18,
    color: '#000',
    text: '',
    style: {}
};

export default CommonText;
