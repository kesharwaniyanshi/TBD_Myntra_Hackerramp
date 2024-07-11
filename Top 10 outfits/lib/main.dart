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

class HomeScreen extends StatelessWidget {
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
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => TopPostsScreen()),
                );
              },
              child: Text('View Top Posts'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => UserRewardScreen()),
                );
              },
              child: Text('Check Your Reward'),
            ),
          ],
        ),
      ),
    );
  }
}

class TopPostsScreen extends StatefulWidget {
  @override
  _TopPostsScreenState createState() => _TopPostsScreenState();
}

class _TopPostsScreenState extends State<TopPostsScreen> {
  String apiUrl = 'http://10.0.2.2:5000/top_posts'; // Updated for Android Emulator

  Future<List<dynamic>> fetchTopPosts() async {
    final response = await http.get(Uri.parse(apiUrl));

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load top posts');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Top 10 Outfits'),
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
