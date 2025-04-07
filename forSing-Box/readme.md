# sing-box

## 规则集
默认规则使用以下匹配逻辑:  
`(domain || domain_suffix || domain_keyword || domain_regex || ip_cidr) &&
(port || port_range) && (source_port || source_port_range) && 其它字段`   
`query_type` : DNS 查询类型。值可以为整数或者类型名称字符串。   
`network` : tcp 或 udp。  
`domain` : 匹配完整域名。  
`domain_suffix` : 匹配域名后缀。  
`domain_keyword` : 匹配域名关键字。  
`domain_regex` : 匹配域名正则表达式。  
`source_ip_cidr` : 匹配源 IP CIDR。  
`ip_cidr` : 匹配 IP CIDR。  
`source_port` : 匹配源端口。  
`source_port_range` : 匹配源端口范围。  
`port` : 匹配端口。  
`port_range` : 匹配端口范围。 
`process_name`  : 使用正则表达式匹配进程路径。`自 sing-box 1.10.0 起，仅支持 Linux、Windows 和 macOS。`  
`package_name` : 匹配 Android 应用包名。  
`network_type` : 匹配网络类型。`wifi`, `cellular`, `ethernet` , `other`
`network_is_expensive` : 匹配如果网络被视为计费 (在 Android) 或被视为昂贵， 像蜂窝网络或个人热点 (在 Apple 平台)。  
`network_is_constrained` : 匹配如果网络在低数据模式下。  
`wifi_ssid` : 匹配 WiFi SSID。  
`invert` : 反选匹配结果。    

### 示例   
```json
{
  "version" : 3
  "rules": [
    {
      "query_type": [
        "A",
        "HTTPS",
        32768
      ],
      "network": [
        "tcp"
      ],
      "domain": [
        "test.com"
      ],
      "domain_suffix": [
        ".cn"
      ],
      "domain_keyword": [
        "test"
      ],
      "domain_regex": [
        "^stun\\..+"
      ],
      "source_ip_cidr": [
        "10.0.0.0/24",
        "192.168.0.1"
      ],
      "ip_cidr": [
        "10.0.0.0/24",
        "192.168.0.1"
      ],
      "source_port": [
        12345
      ],
      "source_port_range": [
        "1000:2000",
        ":3000",
        "4000:"
      ],
      "port": [
        80,
        443
      ],
      "port_range": [
        "1000:2000",
        ":3000",
        "4000:"
      ],
      "process_name": [
        "curl"
      ],
      "process_path": [
        "/usr/bin/curl"
      ],
      "process_path_regex": [
        "^/usr/bin/.+"
      ],
      "package_name": [
        "com.termux"
      ],
      "network_type": [
        "wifi"
      ],
      "network_is_expensive": false,
      "network_is_constrained": false,
      "wifi_ssid": [
        "My WIFI"
      ],
      "wifi_bssid": [
        "00:00:00:00:00:00"
      ],
      "invert": false
    }
  ]
}
```
## DNS配置