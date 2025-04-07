/**
 * 节点名称规范化处理函数
 * @param {{Remark: string, Rate: number}} node - 包含节点名称和倍率的对象
 * @returns {string} 规范化后的节点名称
 */
function rename(node) {
    let remark = node.Remark;
    let rate = node.Rate;
    
    // 定义国家/地区关键词映射表
    const regionKeywords = {
      '香港': ['香港', 'HK', 'HKG', 'HongKong', 'Hong Kong'],
      '台湾': ['台湾', 'TW', 'TWN', 'Taiwan'],
      '日本': ['日本', 'JP', 'JPN', 'Japan'],
      '新加坡': ['新加坡', 'SG', 'SGP', 'Singapore'],
      '美国': ['美国', 'US', 'USA', 'United States']
    };
  
    // 提取括号中的倍率信息
    const rateInBrackets = remark.match(/(?:\[|【)([\d.]+x)(?:\]|】)/);
    if (rateInBrackets) {
      rate = parseFloat(rateInBrackets[1]);
    }
    
    // 提取非括号的倍率信息
    const rateWithoutBrackets = remark.match(/[\d.]+x(?!\]|】)/);
    if (rateWithoutBrackets) {
      rate = parseFloat(rateWithoutBrackets[0]);
    }
  
    // 移除所有括号及其内容
    remark = remark.replace(/[\[【].*?[\]】]/g, '');
    
    // 移除独立的倍率表示
    remark = remark.replace(/\s*[\d.]+x\s*/g, '');
  
    // 检查并处理地区
    let foundRegion = '';
    for (const [region, keywords] of Object.entries(regionKeywords)) {
      // 创建完整词匹配的正则表达式
      const regex = new RegExp(`^(?:${keywords.join('|')})(?:\\s|$)|\\s(?:${keywords.join('|')})(?:\\s|$)|^(?:${keywords.join('|')})$`, 'i');
      const match = remark.match(regex);
      if (match) {
        foundRegion = region;
        // 只替换完整匹配的关键词
        remark = remark.replace(match[0], ' ');
        break;
      }
    }
  
    // 清理分隔符和多余空格
    remark = remark.replace(/[ 丨\|—\-–]/g, ' ')
                   .replace(/\s+/g, ' ')
                   .trim();
  
    // 保留数字、词组和单个字母G/T
    let parts = remark.split(' ')
                      .filter(part => part && (
                        /\d/.test(part) ||     // 包含数字
                        part.length > 1 ||     // 长度大于1的词
                        /^[GT]$/i.test(part)   // 单独的G或T（大小写不敏感）
                      ));
  
    // 组装最终结果
    let result = foundRegion ? `${foundRegion} ${parts.join(' ')}` : parts.join(' ');
    result = result.trim();
  
    // 添加倍率（如果不等于1且不等于0）
    if (rate && rate !== 1 && rate !== 0) {
      result += ` ${rate}x`;
    }
  
    return result;
  }