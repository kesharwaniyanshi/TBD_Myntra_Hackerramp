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
        scaffoldBackgroundColor: Colors.pinkAccent,
      ),
      home: TopPostsScreen(),
    );
  }
}

class TopPostsScreen extends StatefulWidget {
  @override
  _TopPostsScreenState createState() => _TopPostsScreenState();
}

class _TopPostsScreenState extends State<TopPostsScreen> {
  // Update with your Flask server IP and port
  String apiUrl = 'http://10.0.2.2:5000/top_posts';

  Future<List<dynamic>> fetchTopPosts() async {
    final response = await http.get(Uri.parse(apiUrl));

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load top posts: ${response.statusCode}');
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
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Likes: ${post['likes']}'),
                        Text('Shares: ${post['shares']}'),
                        Text('Comments: ${post['comments']}'),
                        Text('Views: ${post['views']}'),
                        Text('Total Score: ${post['total_score']}'),
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
