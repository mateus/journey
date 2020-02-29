import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment-timezone';
import '@shopify/polaris/styles.css';

import {App} from 'foundation';

moment.tz.setDefault('Canada/Toronto');

ReactDOM.render(<App />, document.getElementById('root'));
