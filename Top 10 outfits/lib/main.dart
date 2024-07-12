import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Top 10 Outfits',
      theme: ThemeData(
        primarySwatch: Colors.orange,
        scaffoldBackgroundColor: Colors.white,
      ),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String apiUrl = 'http://10.0.2.2:5000/top_posts'; // Updated for Android Emulator
  int _selectedIndex = 2;

  Future<List<dynamic>> fetchTopPosts() async {
    final response = await http.get(Uri.parse(apiUrl));

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load top posts');
    }
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
      switch (index) {
        case 0:
          // Navigate to home screen
          break;
        case 1:
          // Navigate to chat screen
          break;
        case 2:
          // Navigate to top 10 screen (current screen)
          break;
        case 3:
          // Navigate to shopping screen
          break;
        case 4:
          // Navigate to profile screen
          break;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset('assets/myntra_logo.png', height: 30), // Add the Myntra logo
            SizedBox(width: 10),
            Text('Top 10 Outfits'),
          ],
        ),
      ),
      body: FutureBuilder<List<dynamic>>(
        future: fetchTopPosts(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            final posts = snapshot.data!;
            return ListView.builder(
              itemCount: posts.length,
              itemBuilder: (context, index) {
                final post = posts[index];
                return Card(
                  margin: EdgeInsets.all(10.0),
                  child: ListTile(
                    title: Text('Post ID: ${post['post_id']}'),
                    subtitle: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Icon(Icons.favorite, color: Colors.red),
                        SizedBox(width: 5),
                        Text('${post['likes']}'),
                        SizedBox(width: 15),
                        Icon(Icons.share, color: Colors.blue),
                        SizedBox(width: 5),
                        Text('${post['shares']}'),
                        SizedBox(width: 15),
                        Icon(Icons.comment, color: Colors.green),
                        SizedBox(width: 5),
                        Text('${post['comments']}'),
                      ],
                    ),
                  ),
                );
              },
            );
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => UserRewardScreen()),
          );
        },
        child: Icon(Icons.redeem),
        backgroundColor: Colors.orange,
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: ImageIcon(AssetImage('assets/myntra_logo.png'), color: Colors.black),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.chat, color: Colors.black),
            label: 'Chat',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.star, color: Colors.black),
            label: 'Top 10',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_cart, color: Colors.black),
            label: 'Shop',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person, color: Colors.black),
            label: 'Profile',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.orange,
        unselectedItemColor: Colors.black,
        onTap: _onItemTapped,
      ),
    );
  }
}

class UserRewardScreen extends StatefulWidget {
  @override
  _UserRewardScreenState createState() => _UserRewardScreenState();
}

class _UserRewardScreenState extends State<UserRewardScreen> {
  final TextEditingController _userIdsController = TextEditingController();
  List<dynamic> _rewards = [];

  Future<void> fetchUserRewards(List<int> userIds) async {
    final response = await http.post(
      Uri.parse('http://10.0.2.2:5000/user_rewards'), // Updated for Android Emulator
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'user_ids': userIds}),
    );

    if (response.statusCode == 200) {
      final rewardsData = json.decode(response.body);
      setState(() {
        _rewards = rewardsData;
      });
    } else {
      setState(() {
        _rewards = [];
      });
      throw Exception('Failed to load rewards');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Check Your Reward'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            TextField(
              controller: _userIdsController,
              decoration: InputDecoration(
                labelText: 'Enter User IDs (comma-separated)',
              ),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                List<int> userIds = _userIdsController.text
                    .split(',')
                    .map((id) => int.parse(id.trim()))
                    .toList();
                fetchUserRewards(userIds);
              },
              child: Text('Check Rewards'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.orange,
              ),
            ),
            SizedBox(height: 20),
            Expanded(
              child: ListView.builder(
                itemCount: _rewards.length,
                itemBuilder: (context, index) {
                  final reward = _rewards[index];
                  return Card(
                    margin: EdgeInsets.all(10.0),
                    child: ListTile(
                      title: Text('User ID: ${reward['user_id']}'),
                      subtitle: Text('${reward['reward']}'),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
