import React, {useState, useContext, useEffect} from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import Text from '../Text';

import {View, StyleSheet} from 'react-native';

// Context
import {UserContext} from '../../context/UserContext';
import {useTheme} from '../../context/ThemeManager';

const SegmentedTab = ({info}) => {
  const {theme} = useTheme();
  const [customStyleIndex, setCustomStyleIndex] = useState(0);
  const [data, setData] = useState({});

  const [pet, setPet] = useState(false);
  const [smoke, setSmoke] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [food, setFood] = useState(false);
  const [internet, setInternet] = useState(false);
  const [klima, setKlima] = useState(false);
  const [sicakSu, setSicakSu] = useState(false);

  const [people, setPeople] = useState('');
  const [rooms, setRooms] = useState('');
  const [banyo, setBanyo] = useState('');
  const [kira, setKira] = useState('');
  const [isitmaTuru, setIsitmaTuru] = useState('');
  const [katSayisi, setkatSayisi] = useState('');
  const [kacinciKat, setkacinciKat] = useState('');
  const [balkonSayisi, setBalkonSayisi] = useState('');

  const [siteValues, setSiteValues] = useState([]);

  const handleCustomIndexSelect = (index: number) => {
    if (customStyleIndex != index) {
      setCustomStyleIndex(index);
    }
  };

  const loadData = async data => {
    try {
      if (data) {
        console.log(data);
        if (data[0][0] == 1) {
          setPet(true);
        } else {
          setPet(false);
        }
        if (data[0][1] == 1) {
          setSmoke(true);
        } else {
          setSmoke(false);
        }
        if (data[0][2] == 1) {
          setAlcohol(true);
        } else {
          setAlcohol(false);
        }
        if (data[0][3] == 1) {
          setFood(true);
        } else {
          setFood(false);
        }
        if (data[0][4] == 1) {
          setInternet(true);
        } else {
          setInternet(false);
        }
        if (data[0][5] == 1) {
          setKlima(true);
        } else {
          setKlima(false);
        }
        if (data[0][6] == 1) {
          setSicakSu(true);
        } else {
          setSicakSu(false);
        }

        setPeople(data[1][0]);
        setRooms(data[1][1]);
        setBanyo(data[1][2]);
        setKira(data[1][3]);
        setIsitmaTuru(data[1][4]);
        setkatSayisi(data[1][5]);
        setkacinciKat(data[1][6]);
        setBalkonSayisi(data[1][7]);

        setSiteValues(data[2]);
      }
    } catch (err) {
      console.log('@tabView @loadData => ', err);
    }
  };

  useEffect(() => {
    loadData(info);
    return () => {
      setData(null);
    };
  }, [info]);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <SegmentedControlTab
        values={
          siteValues
            ? ['Ev özellikleri', 'Site özellikleri']
            : ['Ev özellikleri']
        }
        selectedIndex={customStyleIndex}
        onTabPress={handleCustomIndexSelect}
        borderRadius={0}
        tabsContainerStyle={{
          height: 50,
          backgroundColor: theme.buttonBackground,
        }}
        tabStyle={{
          backgroundColor: theme.buttonBackground,
          borderWidth: 0,
          borderColor: 'transparent',
        }}
        activeTabStyle={{backgroundColor: theme.background}}
        activeTabTextStyle={{color: theme.text}}
        tabTextStyle={{color: theme.text, fontWeight: 'bold'}}
      />
      {customStyleIndex === 0 && (
        <View style={styles.tabContent}>
          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Evde kac kisi oturuyor:
            </Text>
            <Text center color={theme.text}>
              {people}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Kira icin ucret beklentisi:
            </Text>
            <Text center color={theme.text}>
              {kira} TL
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Evde evcil hayvan var mi:
            </Text>
            <Text center color={theme.text}>
              {pet ? 'Evet' : 'Hayir'}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Evde sigara iciliyor mu:
            </Text>
            <Text center color={theme.text}>
              {smoke ? 'Evet' : 'Hayir'}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Evde alkol tuketiliyor mu:
            </Text>
            <Text center color={theme.text}>
              {alcohol ? 'Evet' : 'Hayir'}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Evde yemek yapiliyor mu:
            </Text>
            <Text center color={theme.text}>
              {food ? 'Evet' : 'Hayir'}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Oda sayisi:
            </Text>
            <Text center color={theme.text}>
              {rooms}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Banyo sayisi:
            </Text>
            <Text center color={theme.text}>
              {banyo}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Internet:
            </Text>
            <Text center color={theme.text}>
              {internet ? 'Var' : 'Yok'}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Klima:
            </Text>
            <Text center color={theme.text}>
              {klima ? 'Var' : 'Yok'}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Surekli sicak su:
            </Text>
            <Text center color={theme.text}>
              {sicakSu ? 'Var' : 'Yok'}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Isitma turu:
            </Text>
            <Text center color={theme.text}>
              {isitmaTuru}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Kac katli bina:
            </Text>
            <Text center color={theme.text}>
              {katSayisi}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Kacinci kat:
            </Text>
            <Text center color={theme.text}>
              {kacinciKat}
            </Text>
          </View>

          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Balkon sayisi:
            </Text>
            <Text center color={theme.text}>
              {balkonSayisi}
            </Text>
          </View>
        </View>
      )}
      {customStyleIndex === 1 && (
        <View style={styles.tabContent}>
          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Guvenlik:
            </Text>
            <Text center color={theme.text}>
              {siteValues[0] == '1' ? 'Var' : 'Yok'}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Spor salonu:
            </Text>
            <Text center color={theme.text}>
              {siteValues[1] == '1' ? 'Var' : 'Yok'}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Otopark:
            </Text>
            <Text center color={theme.text}>
              {siteValues[2] == '1' ? 'Var' : 'Yok'}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Park:
            </Text>
            <Text center color={theme.text}>
              {siteValues[3] == '1' ? 'Var' : 'Yok'}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text center color={theme.text}>
              Havuz:
            </Text>
            <Text center color={theme.text}>
              {siteValues[4] == '1' ? 'Var' : 'Yok'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabContent: {
    justifyContent: 'space-between',
    width: '100%',
    margin: 5,
  },
  rowView: {
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
});

export default SegmentedTab;
