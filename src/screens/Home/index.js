import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { Images } from '../../assets/Images';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [openCommentIndex, setOpenCommentIndex] = useState(null);

  useEffect(() => {
    axios.get('https://api.loverume.com/api/posts/?offset=0&limit=10')
      .then(response => {
        setPosts(response.data.posts || []);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleLike = (postId) => {
    setLikes(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentInput = (postId, text) => {
    setCommentInputs(prev => ({ ...prev, [postId]: text }));
  };

  const handleAddComment = (postId) => {
    if (!commentInputs[postId]) return;
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), commentInputs[postId]]
    }));
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.postContainer}>
      {item.urls && item.urls[0] && (
        <Image
          source={{ uri: item.urls[0].url }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => handleLike(index)} style={styles.iconButton}>
          <Image
            source={likes[index] ? Images.heartFilled : Images.heart}
            style={styles.actionIcon}
            resizeMode="contain"
          />
          <Text style={{ marginLeft: 4 }}>{likes[index] ? 'Liked' : 'Like'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => setOpenCommentIndex(openCommentIndex === index ? null : index)}>
          <Image
            source={Images.chat}
            style={styles.chatIcon}
            resizeMode="contain"
          />
          <Text style={{ marginLeft: 4 }}>Comment</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.commentsSection}>
        {(comments[index] || []).map((comment, idx) => (
          <View key={idx} style={styles.commentBubble}>
            <Text style={styles.commentText}>{comment}</Text>
          </View>
        ))}
        {openCommentIndex === index && (
          <View style={styles.commentInputRow}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={commentInputs[index] || ''}
              onChangeText={text => handleCommentInput(index, text)}
            />
            <TouchableOpacity onPress={() => handleAddComment(index)} style={styles.addCommentButton}>
              <Image
                source={Images.send}
                style={styles.sendIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.feedContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feedContainer: {
    paddingVertical: 16,
  },
  postContainer: {
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 16,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  commentsSection: {
    marginTop: 8,
  },
  commentBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f2f5',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 4,
    marginLeft: 2,
    marginRight: 32,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  commentText: {
    fontSize: 14,
    color: '#222',
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  addCommentButton: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  chatIcon: {
    width: 22,
    height: 22,
  },
  sendIcon: {
    width: 28,
    height: 28,
    marginLeft: 4,
  },
});
