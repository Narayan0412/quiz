#include <bits/stdc++.h>
using namespace std;
void dfs(int node, vector<vector<int>>& adj, vector<bool>& v) {
    stack<int> s;
    s.push(node);
    while (!s.empty()) {
        int curr = s.top();
        s.pop();
        for (int i=0;i<adj[curr].size():i++) {
            if (!v[adj[curr][i]]) {
                v[adj[curr][i]] = 1;
                s.push(adj[curr][i]);
            }
        }
    }
}
int findMinOTPs(vector<string>& otps) {
    int n = otps.size();
    vector<vector<int>> adj(n);
    unordered_map<char, vector<int>> HashMap;
    for (int i = 0; i < n; i++) {
        unordered_set<char> uniqueChars(otps[i].begin(), otps[i].end());
        for (auto c : uniqueChars) {
            HashMap[c].push_back(i);
        }
    }
    for (auto curr : HashMap) {
        vector<int> index = curr.second;
        for (int i = 0; i < index.size(); i++) {
            for (int j = i + 1; j < index.size(); j++) {
                adj[index[i]].push_back(index[j]);
                adj[index[j]].push_back(index[i]);
            }
        }
    }
    vector<bool> v(n, 0);
    int ans = 0;
    for (int i = 0; i < n;i++) {
        if (!v[i]) {
            v[i] = 1;
            dfs(i, adj, v);
            ans++;
        }
    }
    return ans;
}
int main() {
    int n;
    cin >> n;
    vector<string> otps(n);
    for (int i = 0; i < n; ++i) {
        cin >> otps[i];
    }
    int result = findMinOTPs(otps);
    cout << result << endl;
    return 0;
}