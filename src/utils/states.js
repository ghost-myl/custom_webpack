// 处置状态
const dealStatus = [
  {
    label: '未处置',
    value: 1,
  },
  {
    label: '处置中',
    value: 2,
  },
  {
    label: '已处置',
    value: 3,
  },
];
// 危险等级
const leveList = [
  {
    label: '高危',
    value: '0',
  },
  {
    label: '中危',
    value: '1',
  },
  {
    label: '低危',
    value: '2',
  },
];
// 列表等级函数
const gradeFunction = (record) => {
  let color = '';
  let text = '';
  if (record.urgent_score === '高危') {
    color = '#FF3000';
    text = '高危';
  } else if (record.urgent_score === '中危') {
    color = '#FF9F40';
    text = '中危';
  } else {
    color = '#41A716';
    text = '低危';
  }
  return { color, text };
};

// 处置
const dealFunction = (record) => {
  let color = '';
  let text = '';
  switch (record.status) {
    case 10:
      color = 'processing';
      text = '未处置';
      break;
    case 20:
      color = 'orange';
      text = '处置中';
      break;
    case 21:
      color = 'error';
      text = '高危挂起';
      break;
    case 30:
      color = 'success';
      text = '已处置';
      break;
    default:
      break;
  }
  return { color, text };
};

export { leveList, dealStatus, dealFunction, gradeFunction };
