import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../commons/header';
import Images from '../../constants/images';
import Modal from 'react-native-modal';

const PurchaseMembership = ({navigation}) => {
  const [card, setCard] = useState(true);
  const [card2, setCard2] = useState(false);
  const [card3, setCard3] = useState(false);

  const [modal, setModal] = useState(false);

  const navigateToMemberShip = () => {
    setModal(true);
    setTimeout(() => {
      setModal(false);
      navigation.goBack();
    }, 2000);
  };

  const subscribedPlan = () => (
    <Modal
      backdropOpacity={1}
      backdropTransitionOutTiming={0}
      onBackdropPress={() => setModal(false)}
      isVisible={modal}>
      <View
        style={{
          marginHorizontal: 20,
          paddingVertical: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: 15,
        }}>
        <View
          style={{
            marginVertical: 35,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={Images.tick1} />
          <Text
            style={{
              fontSize: 18,
              color: '#10275A',
              marginVertical: 20,
            }}>
            Successfully Subscribe Plan
          </Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header header="Purchase Membership" />
      <ScrollView>
        <View
          style={{
            backgroundColor: '#D4EBFC',
            borderRadius: 10,
            marginVertical: 10,
            marginHorizontal: 20,
            borderRadius: 20,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Text style={styles.heading}>
                Challenge Membership Plan {'\n'}$30.00
              </Text>
              <View style={{alignItems: 'center'}}>
                <ImageBackground
                  style={styles.uptoPercent}
                  source={Images.blueRect}>
                  <Text style={styles.uptoText}>UPTO {'\n'}50%</Text>
                </ImageBackground>
                <Image style={styles.polygon} source={Images.bluePolygon} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '20%'}} />
              <View
                style={{
                  alignItems: 'flex-start',
                  marginTop: 10,
                  width: '80%',
                  paddingRight: 20,
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.sliderTabs}>
          <TouchableOpacity
            onPress={() => {
              setCard(true);
              setCard2(false);
              setCard3(false);
            }}
            style={[styles.selector, {borderBottomWidth: card ? 2 : 0}]}>
            <Text style={{color: card ? '#7197FE' : 'black'}}>Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setCard(false);
              setCard2(true);
              setCard3(false);
            }}
            style={[styles.selector, {borderBottomWidth: card2 ? 2 : 0}]}>
            <Text style={{color: card2 ? '#7197FE' : 'black'}}>Paypal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCard(false);
              setCard2(false);
              setCard3(true);
            }}
            style={[styles.selector, {borderBottomWidth: card3 ? 2 : 0}]}>
            <Text style={{color: card3 ? '#7197FE' : 'black'}}>Google Pay</Text>
          </TouchableOpacity>
        </View>
        {card ? (
          <View>
            <View style={styles.bottomContainer}>
              <Image style={styles.allCard} source={Images.allCards} />

              <Text style={styles.creditCard}>Credit Card Details</Text>

              <Text style={styles.cardNum}>Card Number</Text>

              <View style={styles.bottomLiner}>
                <Image source={Images.master} />
                <View style={styles.heightLiner} />

                <Text>5220 - _ _ _ _</Text>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text>Expiry Date</Text>
                  <View style={styles.bottomLiner}>
                    <Image style={styles.image} source={Images.calender} />
                    <View style={styles.heightLiner} />

                    <Text>_ _ / _ _</Text>
                  </View>
                </View>

                <View>
                  <Text>CVV</Text>
                  <View style={styles.bottomLiner}>
                    <Image style={styles.image} source={Images.cvv} />
                    <View style={styles.heightLiner} />

                    <Text>_ _ _</Text>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigateToMemberShip()}
              style={styles.btn}>
              <Text style={styles.btnTextPay}>Pay now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
        {subscribedPlan()}
      </ScrollView>
    </View>
  );
};

export default PurchaseMembership;

const styles = StyleSheet.create({
  btnBack: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BE82FF',
    width: 150,
    height: 45,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 2,
    marginTop: 25,
  },
  heading: {
    fontSize: 18,
    color: '#648CFF',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginVertical: 10,
  },
  uptoPercent: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  polygon: {
    width: 25,
    height: 25,
    marginTop: -6,
    resizeMode: 'contain',
  },
  uptoText: {
    fontSize: 8,
    color: 'white',
    textAlign: 'center',
  },
  sliderTabs: {
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginVertical: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  selector: {
    borderBottomWidth: 2,
    borderBottomColor: '#7197FE',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  allCard: {
    alignSelf: 'center',
  },
  bottomContainer: {
    paddingHorizontal: 50,
  },
  bottomLiner: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#d3d3d3',
    paddingBottom: 10,
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  heightLiner: {
    marginHorizontal: 10,
    width: 1,
    backgroundColor: '#d3d3d3',
    height: '100%',
  },
  image: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  creditCard: {
    fontSize: 22,
  },
  cardNum: {
    fontSize: 12,
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#648CFF',
    alignSelf: 'center',
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    marginTop: 10,
  },
  btnTextPay: {
    color: 'white',
    fontSize: 16,
  },
});
