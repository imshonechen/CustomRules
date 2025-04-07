function rename(node) {
    const geoinfo = JSON.parse(geoip(node.Hostname));
    if (geoinfo.country_code == "CN")
        return "CN " + node.Remark;
}