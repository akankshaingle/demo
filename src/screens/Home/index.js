import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import {useCart} from '../../context/CartContext';
import {height, scale, width} from '../../utils/Scale';
import {Colors} from '../../utils/Colors';
import CustomButton from '../../components/Button';
import {Images} from '../../assets/Images';
import Strings from '../../utils/Strings';

const Home = () => {
  const {cartItems, addItem, removeItem, updateItem} = useCart();
  const [expandedItems, setExpandedItems] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [inputValues, setInputValues] = useState({});

  const toggleExpand = itemId => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const toggleEditMode = itemId => {
    setEditMode(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
    
    // Ensure inputValues are initialized with the existing values
    if (!editMode[itemId]) {
      const currentItem = cartItems.find(item => item.id === itemId);
      setInputValues(prev => ({
        ...prev,
        [itemId]: {
          ...currentItem,
        },
      }));
    }
  };

  const handleInputChange = (itemId, key, value) => {
    setInputValues(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [key]: value,
      },
    }));
  };

  const handleUpdate = itemId => {
    if (inputValues[itemId]) {
      updateItem(itemId, inputValues[itemId]);
      toggleEditMode(itemId);
    }
  };

  const handleRemoveItem = itemId => {
    removeItem(itemId);
  };

  const renderItem = ({item, index}) => {
    const isExpanded = expandedItems.includes(item.id);
    const isEditing = editMode[item.id];

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
          style={styles.header}>
          <Text style={styles.itemIndex}>{`${Strings.item} ${index + 1}`}</Text>
          <Image
            source={Images.arrow_down}
            style={isExpanded ? styles.arrowIcon : styles.arrowDownIcon}
          />
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.itemSubContainer}>
            {[
              'partName',
              'vehicleMake',
              'vehicleModel',
              'vehicleYear',
              'partType',
            ].map(key => (
              <View style={styles.row} key={key}>
                <Text style={styles.key}>{Strings[key]}</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={inputValues[item.id]?.[key] || ''}
                    onChangeText={value =>
                      handleInputChange(item.id, key, value)
                    }
                  />
                ) : (
                  <Text style={styles.value}>: {item[key]}</Text>
                )}
              </View>
            ))}
            <Text style={styles.desc}>{Strings.description}</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.textArea]}
                value={inputValues[item.id]?.description || ''}
                onChangeText={value =>
                  handleInputChange(item.id, 'description', value)
                }
                multiline
              />
            ) : (
              <Text style={[styles.value, styles.valueColor]}>
                {item.description}
              </Text>
            )}
            <View style={styles.buttons}>
              <CustomButton
                title={isEditing ? Strings.update : Strings.edit}
                onPress={() =>
                  isEditing ? handleUpdate(item.id) : toggleEditMode(item.id)
                }
                buttonStyle={styles.editButton}
                textStyle={styles.buttonText}
              />
              <CustomButton
                title={Strings.remove}
                onPress={() => handleRemoveItem(item.id)}
                buttonStyle={styles.button}
                textStyle={[styles.buttonText, styles.whiteButtonText]}
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <CustomHeader title={Strings.myCart} />
      <View style={styles.container}>
        <Text style={styles.heading}>{Strings.itemList}</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartItems}
          keyExtractor={item => item?.id}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <Text style={styles.noItemsText}>{Strings.noItemsAdded}</Text>
          )}
        />
        {cartItems?.length > 0 && (
          <View style={[styles.itemContainer, styles.itemSubContainer]}>
            <Text style={styles.pricingDetails}>{Strings.pricingDetails}</Text>
            <View style={styles.price}>
              <Text style={styles.text}>
                {Strings.price} ({cartItems.length}{' '}
                {cartItems.length > 1 ? Strings.items : Strings.item})
              </Text>
              <Text style={styles.text}>
                {Strings.currency}{' '}
                {cartItems.reduce(
                  (total, item) => total + (item.price || 0),
                  0,
                )}
              </Text>
            </View>
            <View style={styles.totalAmount}>
              <Text style={styles.text}>{Strings.totalAmount}</Text>
              <Text style={styles.total}>
                {Strings.currency}{' '}
                {cartItems.reduce(
                  (total, item) => total + (item.price || 0),
                  0,
                )}
              </Text>
            </View>
          </View>
        )}

        <Text style={styles.footerText}>
          {Strings.postingRequirement}{' '}
          <Text style={styles.footerTextHighlight}>{Strings.currency} 10</Text>
        </Text>

        <CustomButton
          title={cartItems?.length > 0 ? Strings.addMoreItem : Strings.addItem}
          onPress={() =>
            addItem({
              id: Math.random().toString(),
              partName: 'Front Brake Disk',
              vehicleMake: 'HYUNDAI',
              vehicleModel: 'SANTRO 1ST GEN',
              vehicleYear: 2002,
              partType: 'Disk Brakes',
              description:
                'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
              price: 10,
            })
          }
          buttonStyle={styles.addMoreButton}
          textStyle={styles.buttonText}
        />
        <CustomButton
          title={Strings.paid}
          onPress={() => {}}
          buttonStyle={styles.paidButton}
          textStyle={styles.paidButtonText}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.03,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.04,
    backgroundColor: Colors.white,
  },
  heading: {
    fontSize: scale(16),
    fontWeight: '600',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: Colors.cornflowerBlue,
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: Colors.lavender,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemIndex: {
    fontSize: scale(12),
    fontWeight: '600',
    color: Colors.chineseBlack,
  },
  itemSubContainer: {
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  key: {
    fontSize: scale(14),
    fontWeight: '500',
    color: Colors.chineseBlack,
    flex: 1,
  },
  value: {
    fontSize: scale(14),
    fontWeight: '400',
    flex: 1,
  },
  valueColor: {
    color: Colors.babyBlue,
  },
  desc: {
    marginVertical: 3,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.cornflowerBlue,
    borderRadius: 4,
    padding: 5,
    fontSize: scale(14),
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  editButton: {
    backgroundColor: Colors.lavender,
    flex: 1,
  },
  button: {
    backgroundColor: Colors.cornflowerBlue,
    flex: 1,
  },
  whiteButtonText: {
    color: Colors.white,
  },
  buttonText: {
    color: Colors.cornflowerBlue,
    fontSize: scale(12),
    fontWeight: '500',
  },
  addMoreButton: {
    backgroundColor: Colors.white,
    marginTop: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.cornflowerBlue,
  },
  paidButton: {
    backgroundColor: '#4A52FF',
    marginTop: 15,
    paddingVertical: 10,
  },
  paidButtonText: {
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
  arrowIcon: {
    height: width * 0.015,
    width: width * 0.03,
  },
  arrowDownIcon: {
    height: width * 0.015,
    width: width * 0.03,
    transform: [{rotate: '180deg'}],
  },
  pricingDetails: {
    color: Colors.chineseBlack,
    fontSize: scale(13),
    fontWeight: '700',
    paddingBottom: 15,
  },
  footerText: {
    color: Colors.chineseBlack,
    fontSize: scale(12),
    fontWeight: '500',
    marginTop: height * 0.03,
  },
  text: {
    color: Colors.chineseBlack,
    fontSize: scale(12),
    fontWeight: '500',
  },
  total: {
    color: Colors.chineseBlack,
    fontSize: scale(12),
    fontWeight: '600',
  },
  footerTextHighlight: {
    color: '#4A52FF',
  },
  totalAmount: {
    borderTopWidth: 1,
    borderColor: Colors.lavender,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  price: {
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
