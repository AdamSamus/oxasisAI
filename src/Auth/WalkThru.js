import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  Image,
  Platform,
  View,
  Text,
  TouchableHighlight,
} from 'react-native'
import { BackHandler } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from 'react-native-snap-carousel'
import {Colors} from '../styles'
import LoginStyles from './LogInStyles'

const loginStyles = LoginStyles.createStyles()
const SLIDE_COUNT = 18
carousel = React.createRef()

export default class WalkThru extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    header: null,
  }

  state = {
    currentSlide: 0,
  }


constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}

componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
}








  get slides() {
    return [
      {
        title: '',
        text: '',
        image: this.getImage(''),
      },
      {
        title: '',
        text: '',
        image: this.getImage(''),
      },
      {
        title: '',
        text: '',
        image: this.getImage(''),
      },
      {
        title: '',
        text: '',
        image: this.getImage(''),

      },
      {
        title: '',
        text: '',
        image: this.getImage(''),

      },
      {
        title: '',
        text: '',
        image: this.getImage(''),

      },
      {
        title: '',
        text: '',
        image: this.getImage(''),

      },
      {
        title: '',
        text: '',
        image: this.getImage(''),

      },
      {
        title: '',
        text: '',
        image: this.getImage(''),
      },
      {
        title: '',
        text: '',
        image: this.getImage(''),

      },
      {
        title: '',
        text: '',
        image: this.getImage(''),

      },
      {
        title: '',
        text: '',
        image: this.getImage(''),

      },
      {
        title: '',
        text: '',
        image: this.getImage(''),

      },
      {
        title: '',
        text: '',
        image: this.getImage(''),

      },
      {
        title: '',
        text: '',
        image: this.getImage(''),

      },
      {
        title: '',
        text: '',
        image: this.getImage(''),

      },
      {
        title: '',
        title: '',        image: this.getImage('extenders2'),

      },
      {
        title: '',


      }

    ]
  }

  get buttonText() {
    return this.state.currentSlide === SLIDE_COUNT - 1 ? 'Start' : 'Continue'
  }

  getImage(key) {
    return Platform.OS === 'android' ? this.getAndroidImage(key) : this.getIOSImage(key)
  }





  // eslint-disable-next-line complexity
  getAndroidImage(key) {
  }

  // eslint-disable-next-line complexity
  getIOSImage(key) {
  }


handleBackButtonClick(){
this.props.navigation.navigate('Overview')

}


  handleSlideChange = (currentSlide) => {
    this.setState({currentSlide})
  }

  goToNextSlide = () => {
  if (this.state.currentSlide === SLIDE_COUNT - 1)
    {this.props.navigation.navigate('Overview')
    }{this.refs.carousel.snapToNext();
        }
 }


  renderItem({item}) {
    return (
      <View>
        <Text style={loginStyles.walkthroughTitle}>
          {item.title}
        </Text>
        <Text style={loginStyles.walkthroughText}>
          {item.text}
        </Text>
        <Image
          resizeMode='contain'
          style={loginStyles.walkthroughImage}
          source={item.image}
        />
      </View>
    )
  }

  render() {
    const width = Dimensions.get('window').width * 0.9

    return (
      <View style={loginStyles.containerExpand}>
        <View style={loginStyles.carouselOuter}>
          <ProgressDots current={this.state.currentSlide} total={SLIDE_COUNT} />
          <Carousel
            ref={'carousel'}
            data={this.slides}
            renderItem={this.renderItem}
            onBeforeSnapToItem={this.handleSlideChange}
            itemWidth={width}
            sliderWidth={width}
          />
        </View>
        <View style={loginStyles.buttonContainer}>
          <TouchableHighlight
            style={loginStyles.button}
            /*onPress={() => this.props.navigation.navigate('Overview')}*/
            /*onPress={() => { this.refs.carousel.snapToNext(); }}*/
            /*onPress={() => { this.state.currentSlide === SLIDE_COUNT - 1 ? {this.refs.carousel.snapToNext();} : {this.props.navigation.navigate('Overview')}}*/
            onPress={this.goToNextSlide}





            underlayColor={Colors.buttonSecondaryBkgdActive}
          >
            <Text style={loginStyles.buttonText}>{this.buttonText}</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

/**
 * renderer the dots
 *
 * @param {mixed} dot information of sliders
 */
const ProgressDots = ({current, total}) => {
  return (
    <View style={loginStyles.walkthroughProgress}>
      {[...Array(total)].map((_value, index) => (
        <Icon
          key={index}
          name='circle-medium'
          size={loginStyles.progressDot.width}
          style={index === current ? loginStyles.currentProgressDot : loginStyles.progressDot}
        />
      ))}
    </View>
  )
}

ProgressDots.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
}
