// 默认值

import { parseImage, parseBoolean } from './parser'

// 正整数
export const RE_STR_NORMAL_NUMBER = '(\\-?(\\d|[1-9]\\d+))'

export const createDateTimeRegExp = (name) => new RegExp(`^${name}((\\|(y-m-d|y\\/m\\/d)) h:i:s)?$`, 'i')
export const createDateRegExp = (name) => new RegExp(`^${name}(\\|(y-m-d|y\\/m\\/d))?$`, 'i')
export const createTimeRegExp = (name) => new RegExp(`^${name}(\\|h:i:s)?$`, 'i')
export const createImageRegExp = (name) => new RegExp(`^${name}(\\|((\\d|[1-9]\\d+)\\*(\\d|[1-9]\\d+)),(\\w+))?(\\|((\\d|[1-9]\\d+)\\*(\\d|[1-9]\\d+)))?$`)
export const createOneOfRegExp = (name, types) => new RegExp(`^${name}(\\|(${types.join('|')}))?$`)
export const createRangeRegExp = (name) => new RegExp(`^(${name})(\\|((\\-?(\\d|[1-9]\\d+))\\-(\\d|[1-9]\\d+)|(\\-?(\\d|[1-9]\\d+))))?$`)
export const createNumberRangeRegExp = (name) => new RegExp(`^${name}(\\|\\-?((\\d|[1-9]\\d+)~\\-?(\\d|[1-9]\\d+)|\\-?(\\d|[1-9]\\d+)))?$`)
export const creatFloatRangeRegExp = (name) => new RegExp(`^${name}(\\|\\-?((\\d|[1-9]\\d+)~\\-?(\\d|[1-9]\\d+)|\\-?(\\d|[1-9]\\d+))(?:\\.(\\d+-?\\d*)))?$`)

/**
 * mock 语法列表
 */
const mockRules = {
  isUse: false,
  rules: {
    string: [
      {
        searchKey: '',
        name: 'string',
        cnName: '字符串',
        allow: { range: { min: 1, max: 10000 }, regexp: createRangeRegExp('string') },
        syntax: [
          'string',
          '随机生成大于等于3小于等于10长度的英文字符串',
          'string|len',
          '生成指定长度的英文字符串',
          'string|min-max',
          '随机生成大于等于min小于等于max长度的英文字符串',
        ],
        example: ['string', '-> cegikmoq', 'string|3', '-> wtq', 'string|1-5', '-> xvt'],
      },
      {
        searchKey: '',
        name: 'paragraph',
        cnName: '英文段落',
        allow: { actionText: '句子个数', range: { min: 1, max: 20 }, regexp: createRangeRegExp('paragraph') },
        syntax: [
          'paragraph',
          '随机生成大于等于3小于等于7个句子的英文段落',
          'paragraph|len',
          '生成指定句子个数的段落',
          'paragraph|min-max',
          '随机生成大于等于min小于等于max个句子的英文段落',
        ],
        example: [
          'paragraph',
          '-> Lfk zzz slewpibtmf tnhbu kufpzkuf fkp eimquyd vrnjfbwsok eimquy lwitfqcn zzzzzzzzz qhx upkfzu kufp vrnjfbw qhxofvmdt. Lgmsy lwit mylxkw lwitfqcny hovdkry lwitfqcn upkfzupkfz wtqnkhebxu xvtrpnl pfuk iqyhpxg eimquy aaaaaaaa aaaaaaa. Hcegikmo yxwvutsr odrgu aaaaaaa xvt yxwvutsr pfu qhxo vrnj qhxo nboc eimquydhl iqyhpxgow pfukzpfukz upkf xvtrpnljhf. Tkufp gmsyflr aaaaaa slewp odrguj vrn mylxk hov vrnjfbw zzzzzzzzzz dgjmpsv odrg eimq dgjmpsvy gmsyflr. Rupk rjbskc zzzzzzz gmsyfl nbocpdqer slewpibt zzzzzzzzzz jscluenwg zzzzz bcdefgh xvtrp wtqnkheb wtqnk. Lmylxkwjv wtqnkh bcde cegikm tnhb gmsyflrx odrgujxm aaaa iqyhpx sle iqyhp upkfzupkf pfukzp upkfzupk iqy aaaaa nbo dgj. Zrjbskc hov nbo mylxkwjviu bcde wtqnkhe aaaaaa jscl lwitfqc upk lwitfqcnyk xvtrpnljhf yxwvutsr fkpuzf.',
          'paragraph|2',
          '-> Wkufpzkufp kufpz lwi slewpibt tnh zzzzzz wtqnkhe odrgujxmb yxwvutsrq tnhbuoicv nboc zzz odrgujxmbp zzzzzzzzzz jsclue. Rcegikm yxwvutsrq aaaaaaa hovd xvt qhxofvmdtk wtqnkheb slewpibtm mylx vrnjfbw qhxofvmdtk pfukzpfukz wtqn.',
          'paragraph|1-3',
          '-> Lxvtrpnl vrn qhxofvmdt lwitfqcny yxwv tnhbuo iqyhpxgowf rjbskc jscluenw yxwvutsrq fkpuzfkp upkfzup vrnjfbws upkfzu aaaaaaa lwit tnhbuoicv. Fzzz eimq aaaaa iqyh mylxkwjv vrnjfbwsok iqyhpxgo gmsyfl lwitfqcnyk slewpibtm upkfzupk kufpzk upkfzupkfz slewpibtmf yxwvutsrqp qhxofvmd nbocpdqe.',
        ],
      },
      {
        searchKey: '',
        name: 'sentence',
        cnName: '英文句子',
        allow: { actionText: '单词个数', range: { min: 1, max: 30 }, regexp: createRangeRegExp('sentence') },
        syntax: [
          'sentence',
          '随机生成大于等于12小于等于18个单词的英文句子',
          'sentence|len',
          '生成指定单词个数的句子',
          'sentence|min-max',
          '随机生成大于等于min小于等于max个单词的英文句子',
        ],
        example: [
          'sentence',
          '-> Okufpz hovdkr fkpuzf pfukzpfukz aaaaaaaa gmsyf odrgu fkpuzfkp lwitf rjbs eim nbocpdqer mylx hovdk.',
          'sentence|5',
          '-> Mjsclu xvtrpn slewp xvtrpn slewp.',
          'sentence|3-5',
          '-> Epfukzpf lwitfqcn upkfzupk.',
        ],
      },
      {
        searchKey: '',
        name: 'word',
        cnName: '英文单词',
        allow: { actionText: '字母个数', range: { min: 1, max: 20 }, regexp: createRangeRegExp('word') },
        syntax: ['word', '随机生成大于等于3小于等于10个字母的英文单词', 'word|len', '生成指定字母个数的单词', 'word|min-max', '随机生成大于等于min小于等于max个字母的英文单词'],
        example: ['word', '-> aaa', 'word|5', '-> slewp', 'word|3-5', '-> yxwvu'],
      },
      {
        searchKey: '',
        name: 'title',
        cnName: '英文标题',
        allow: { actionText: '单词个数', range: { min: 1, max: 15 }, regexp: createRangeRegExp('title') },
        syntax: [
          'title',
          '随机生成大于等于3小于等于7个单词的英文标题',
          'title|len',
          '生成指定单词个数的英文标题',
          'title|min-max',
          '随机生成大于等于min小于等于max个单词的英文标题',
        ],
        example: ['title', '-> Omylxk Ubcdefghij Cfkpuz Kcegikm', 'title|5', '-> Bslewpi Tbcde Xslewpibtm Thovdkrygn Ymylxk', 'title|3-5', '-> Pgmsyflr Qwtqnkheb Sup Yxvtrpnljh'],
      },
      {
        searchKey: '',
        name: 'phrase',
        cnName: '英文短语',
        allow: { actionText: '单词个数', range: { min: 1, max: 15 }, regexp: createRangeRegExp('phrase') },
        syntax: [
          'phrase',
          '随机生成大于等于3小于等于7个单词的英文短语',
          'phrase|len',
          '生成指定单词个数的英文短语',
          'phrase|min-max',
          '随机生成大于等于min小于等于max个单词的英文短语',
        ],
        example: [
          'phrase',
          '-> Omylxk Ubcdefghij Cfkpuz Kcegikm',
          'phrase|5',
          '-> Bslewpi Tbcde Xslewpibtm Thovdkrygn Ymylxk',
          'phrase|3-5',
          '-> Pgmsyflr Qwtqnkheb Sup Yxvtrpnljh',
        ],
      },
      {
        searchKey: '',
        name: 'phone',
        cnName: '手机号',
        syntax: ['phone', '随机生成一个国内手机号码'],
        example: ['phone', '-> 13333333333'],
      },

      {
        searchKey: '',
        name: 'idcard',
        cnName: '身份证号',
        syntax: ['idcard', '随机生成一个身份证号码'],
        example: ['idcard', '-> 610102202003170019'],
      },
      {
        searchKey: '',
        name: 'url',
        cnName: '网址',
        syntax: ['url', '随机生成一个url'],
        example: ['url', '-> https://apicat.net'],
      },
      {
        searchKey: '',
        name: 'domain',
        cnName: '域名',
        syntax: ['domain', '随机生成一个域名'],
        example: ['domain', '-> apicat.net'],
      },
      {
        searchKey: 'ip ipv6',
        name: 'ipv6',
        cnName: 'IPv6地址',
        syntax: ['ipv6', '随机生成一个ipv6地址'],
        example: ['ipv6', '-> 2001:0db8:3c4d:0015:0000:0000:1a2f:1a2b'],
      },
      {
        searchKey: 'ip ipv4',
        name: 'ipv4',
        cnName: 'IPv4地址',
        syntax: ['ipv4', '随机生成一个ipv4地址'],
        example: ['ipv4', '-> 127.0.0.1'],
      },
      {
        searchKey: '',
        name: 'email',
        cnName: '电子邮箱',
        syntax: ['email', '随机生成一个email'],
        example: ['email', '-> helloworld@gmail.com'],
      },
      {
        searchKey: '',
        name: 'provinceorstate',
        cnName: '省',
        syntax: ['provinceorstate', '随机生成一个省名称'],
        example: ['provinceorstate', '-> 陕西省'],
      },
      {
        searchKey: '',
        name: 'street',
        cnName: '街道',
        syntax: ['street', '随机生成街道名称'],
        example: ['street', '-> 因看大街吴云 商场64-4号'],
      },
      {
        searchKey: '',
        name: 'city',
        cnName: '城市',
        syntax: ['city', '随机生成一个城市名称'],
        example: ['city', '-> 西安'],
      },

      {
        searchKey: '地址',
        name: 'address',
        cnName: '省市区',
        syntax: ['address', '随机生成一个详细地址'],
        example: ['address', '-> 陕西省西安市新城区还用场集小区1栋0单元975号'],
      },
      {
        searchKey: '',
        name: 'zipcode',
        cnName: '邮政编码',
        syntax: ['zipcode', '随机生成一个邮政编码'],
        example: ['zipcode', '-> 710000'],
      },
      {
        searchKey: '',
        name: 'longitude',
        cnName: '经度',
        syntax: ['longitude', '随机生成一个经度'],
        example: ['longitude', '-> 116.397128'],
      },
      {
        searchKey: '',
        name: 'latitude',
        cnName: '维度',
        syntax: ['latitude', '随机生成一个维度'],
        example: ['latitude', '-> 39.916527'],
      },
      {
        searchKey: 'longitude latitude',
        name: 'longitude&latitude',
        cnName: '经纬度',
        syntax: ['longitude&latitude', '随机生成一个经纬度'],
        example: ['longitude&latitude', '-> 116.397128, 39.916527'],
      },
      {
        searchKey: '',
        name: 'date',
        cnName: '日期',
        allow: { regexp: createDateRegExp('date') },
        syntax: ['date', '随机生成一个(Y-M-D)格式的日期', 'date|format', '随机生成一个指定格式的日期，format为(YyMmDd)的排列组合'],
        example: ['date', '-> 2020-03-17', 'date|Y-M-D', '-> 2020-03-17', 'date|y-m-d', '-> 20-3-17', 'date|Y/M/D', '-> 2020/03/17', 'date|y/m/d ', '-> 20/3/17'],
      },
      {
        searchKey: '',
        name: 'time',
        cnName: '时间',
        allow: { regexp: createTimeRegExp('time') },
        syntax: ['time', '随机生成一个(H:I:S)格式的时间', 'time|format', '随机生成一个指定格式的时间，format为(HhIiSs)的排列组合'],
        example: ['time', '-> 09:00:00', 'time|H:I:S', '-> 09:00:00', 'time|h:i:s', '-> 9:0:0'],
      },
      {
        searchKey: '',
        name: 'datetime',
        cnName: '日期时间',
        allow: { regexp: createDateTimeRegExp('datetime') },
        syntax: ['datetime', '随机生成一个(Y-M-D H:I:S)格式的日期时间', 'datetime|format', '随机生成一个指定格式的日期时间，format为(YyMmDd HhIiSs)的排列组合'],
        example: [
          'datetime',
          '-> 2020-03-17 09:00:00',
          'datetime|Y-M-D H:I:S',
          '-> 2020-03-17 09:00:00',
          'datetime|y-m-d h:i:s',
          '-> 20-3-17 9:0:0',
          'datetime|Y/M/D H:I:S',
          '-> 2020/03/17 09:00:00',
          'datetime|y/m/d h:i:s',
          '-> 20/3/17 9:0:0',
        ],
      },
      {
        searchKey: '',
        name: 'timestamp',
        cnName: '时间戳',
        syntax: ['timestamp', '随机生成一个时间戳'],
        example: ['timestamp', '-> 1584406800'],
      },
      {
        searchKey: '',
        name: 'now',
        cnName: '当前时间',
        syntax: ['now', '当前时间'],
        example: ['now', '-> 2022-05-22 13:00:32'],
      },

      {
        searchKey: '',
        name: 'dataimage',
        cnName: '图片数据',
        allow: {
          isSwap: true,
          range: { min: 20, max: 1024, minActionText: '图片宽度', maxActionText: '图片高度' },
          parse: parseImage,
          oneOfTypes: ['jpeg', 'png'],
          regexp: createImageRegExp('dataimage'),
        },
        syntax: [
          'dataimage',
          '生成一个200*150的jpeg Base64编码的图片',
          'dataimage|width*height',
          '生成一个指定宽高的jpeg Base64编码的图片',
          'dataimage|width*height,type',
          '生成一个指定宽高和类型的Base64编码的图片，类型type只支持jpeg和png',
        ],
        example: [
          'dataimage',
          '-> data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAM...',
          'dataimage|200*200',
          '-> data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAM...',
          'dataimage|600*400,png',
          '-> data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM...',
        ],
      },
      {
        searchKey: 'image',
        name: 'imageurl',
        cnName: '图片链接',
        allow: {
          isSwap: true,
          range: { min: 20, max: 1024, minActionText: '图片宽度', maxActionText: '图片高度' },
          parse: parseImage,
          oneOfTypes: ['jpeg', 'png'],
          regexp: createImageRegExp('imageurl'),
        },
        syntax: [
          'imageurl',
          '生成一个200*150的jpeg图片链接',
          'imageurl|width*height',
          '生成一个指定宽高的jpeg图片链接',
          'imageurl|width*height,type',
          '生成一个指定宽高和类型的图片链接，类型type只支持jpeg和png',
        ],
        example: [
          'imageurl',
          '-> http://mock.apicat.net/image/200x150.jpeg',
          'imageurl|200*200',
          '-> http://mock.apicat.net/image/200x200.jpeg',
          'imageurl|200*200,png',
          '-> http://mock.apicat.net/image/200x200.png',
        ],
      },
      // {
      //   searchKey: 'file',
      //   name: 'fileurl',
      //   cnName: '文件链接',
      //   allow: { regexp: createOneOfRegExp('fileurl', ['word', 'excel', 'csv', 'md']) },
      //   syntax: ['fileurl', '生成一个markdown的文件链接', 'fileurl|type', '生成一个指定类型的文件链接，类型type只支持word、excel、csv、md'],
      //   example: ['fileurl', '-> http://mock.apicat.net/file/welcome_to_use_apicat.md', 'fileurl|csv', '-> http://mock.apicat.net/file/welcome_to_use_apicat.csv'],
      // },
      {
        searchKey: '',
        name: 'color',
        cnName: '颜色',
        allow: { regexp: createOneOfRegExp('color', ['rgb', 'rgba', 'hsl', 'hex']) },
        syntax: ['color', '默认生成hex颜色', 'color|type', '随机生成颜色值，类型type只支持rgb、rgba、hsl、hex'],
        example: ['color', '-> #002211', 'color|rgb', '-> rgb(255,0,123)'],
      },

      {
        searchKey: '状态码',
        name: 'httpcode',
        cnName: 'http状态码',
        syntax: ['httpcode', '随机生成一个http状态码'],
        example: ['httpcode', '-> 200'],
      },
      {
        searchKey: 'http 请求方法',
        name: 'httpmethod',
        cnName: 'http请求方法',
        syntax: ['httpmethod', '随机生成一个http请求方法'],
        example: ['httpmethod', '-> DELETE'],
      },
    ],
    integer: [
      {
        searchKey: '',
        name: 'int',
        cnName: '整数',
        allow: { range: { min: -1000000, max: 1000000 }, regexp: createNumberRangeRegExp('int') },
        syntax: ['int', '随机生成0-1000的整数', 'int|count', '生成指定数值的整数', 'int|min~max', '随机生成大于等于min小于等于max的整数'],
        example: ['int', '-> 123', 'int|123', '-> 123', 'int|1~10', '-> 5', 'int|-100~-50', '-> -66'],
      },
      {
        searchKey: '',
        name: 'mobile',
        cnName: '手机号',
        syntax: ['mobile', '随机生成一个国内手机号码'],
        example: ['mobile', '-> 13333333333'],
      },
      {
        searchKey: '',
        name: 'idcard',
        cnName: '身份证号',
        syntax: ['idcard', '随机生成一个身份证号码'],
        example: ['idcard', '-> 610102202003170019'],
      },
      {
        searchKey: '',
        name: 'zipcode',
        cnName: '邮政编码',
        syntax: ['zipcode', '随机生成一个邮政编码'],
        example: ['zipcode', '-> 710000'],
      },
      {
        searchKey: '',
        name: 'timestamp',
        cnName: '时间戳',
        syntax: ['timestamp', '随机生成一个时间戳'],
        example: ['timestamp', '-> 1584406800'],
      },
    ],
    boolean: [
      {
        searchKey: '',
        name: 'boolean',
        cnName: '布尔值',
        allow: {
          range: { min: 0, max: 100 },
          parse: parseBoolean,
          regexp: createOneOfRegExp('boolean', ['true', 'false', RE_STR_NORMAL_NUMBER]),
        },
        syntax: [
          'boolean',
          '随机生成一个50%概率的true or false',
          'boolean|value',
          'value为true or false，代表生成指定的布尔值',
          'boolean|probability',
          'probability为0-100的整数，代表生成true的概率，1表示1%，99表示99%',
        ],
        example: [
          'boolean',
          '-> true',
          'boolean|true',
          '-> true',
          'boolean|false',
          '-> false',
          'boolean|0',
          '-> false',
          'boolean|25',
          '-> false',
          'boolean|99',
          '-> true',
          'boolean|100',
          '-> true',
        ],
      },
    ],
    array: [
      {
        searchKey: '',
        name: 'array',
        cnName: '数组',
        allow: { range: { min: 0, max: 50, minActionText: '最小长度', maxActionText: '最大长度' }, regexp: createRangeRegExp('array') },
        syntax: ['array', '数组内的所有元素，随机循环1-5次', 'array|count', '数组内的所有元素循环count次', 'array|min-max', '数组内的所有元素，随机循环大于等于min小于等于max次'],
        example: [
          '// 数组arr1',
          'arr1 = [string|1]',
          '// 数组arr1的规则及结果',
          'array',
          '-> ["a", "b", "c"]',
          '',
          '// 数组arr2',
          'arr2 = [string|1, number|1-9]',
          '// 数组arr2的规则及结果',
          'array|3',
          '-> ["a", 1, "z", 8, "y", 6]',
          '',
          '// 数组arr3',
          'arr3 = [string|1, number|1-9]',
          '// 数组arr3的规则及结果',
          'array|1-3',
          '-> ["a", 1, "z", 8]',
        ],
      },
    ],
    object: [
      {
        searchKey: '',
        name: 'object',
        cnName: '对象',
        syntax: ['object', '对象内的所有元素以key:val的方式组成object'],
        example: ['// 对象obj', 'obj = {"username": string|6, "password": string|6}', '// 对象obj的规则及结果', 'object', '-> {"username": "abcdef", "password": "123456"}'],
      },
    ],
    arrayobject: [
      {
        searchKey: '',
        name: 'array_object',
        alias: 'arrayObject',
        cnName: '数组对象',
        allow: { range: { min: 0, max: 50, minActionText: '最小长度', maxActionText: '最大长度' }, regexp: createRangeRegExp('array_object') },
        syntax: [
          'array_object',
          '数组内的所有元素以key:val的方式组成object，随机生成大于等于1小于等于5个对象元素',
          'array_object|count',
          '数组内的所有元素以key:val的方式组成object，生成count个对象元素',
          'array_object|min-max',
          '数组内的所有元素以key:val的方式组成object，随机生成大于等于min小于等于max个对象元素',
        ],
        example: [
          '// 数组arr1',
          'arr1 = ["username": string|6, "password": string|6]',
          '// 数组arr1的规则及结果',
          'array_object',
          '-> [{"username": "abcdef", "password": "123456"}, {"username": "qwerty", "password": "1q2w3e"}]',
          '',
          '// 数组arr2',
          'arr2 = ["username": string|6]',
          '// 数组arr2的规则及结果',
          'array_object|3',
          '-> [{"username": "abcdef"}, {"username": "qwerty"}, {"username": "ijnuhb"}]',
          '',
          '// 数组arr3',
          'arr3 = ["username": string|6, "password": string|6]',
          '// 数组arr3的规则及结果',
          'array_object|1-3',
          '-> [{"username": "abcdef", "password": "123456"}, {"username": "qwerty", "password": "1q2w3e"}, {"username": "ijnuhb", "password": "5c6v7b"}]',
        ],
      },
    ],
    file: [
      {
        searchKey: '',
        name: 'file',
        cnName: '文件',
        allow: { regexp: createOneOfRegExp('file', ['word', 'excel', 'csv', 'md']) },
        syntax: ['file', '生成一个Markdown文件，以文件流的方式返回', 'file|type', '生成一个指定类型的文件，以文件流的方式返回，类型type只支持word、excel、csv、md'],
        example: ['file', '-> 返回一个Markdown文件流内容', 'file|word', '-> 返回一个word文件流'],
      },
      {
        searchKey: '',
        name: 'image',
        cnName: '图片',
        allow: {
          isSwap: true,
          range: { min: 20, max: 1024, minActionText: '图片宽度', maxActionText: '图片高度' },
          parse: parseImage,
          oneOfTypes: ['jpeg', 'png'],
          regexp: createImageRegExp('image'),
        },
        syntax: [
          'image',
          '生成一个200*150的jpeg图片流',
          'image|width*height',
          '随机生成一个指定宽高的jpeg图片流',
          'image|width*height,type',
          '随机生成一个指定宽高和类型的图片流，类型type只支持jpeg和png',
        ],
        example: ['image', '-> 返回一个200*150的jpeg图片流', 'image|200*200', '-> 返回一个200*200的jpeg图片流', 'image|600*400,png', '-> 返回一个600*400的png图片流'],
      },
    ],
    number: [
      {
        searchKey: '',
        name: 'float',
        cnName: '浮点数',
        allow: {
          prefix: '整数',
          actionText: '整数',
          range: { min: -1000000, max: 1000000 },
          decimal: { min: 1, max: 10 },
          regexp: creatFloatRangeRegExp('float'),
        },
        syntax: [
          'float',
          '随机生成0-1000的整数和1-3位随机小数的浮点数',
          'float|count.dcount',
          '生成指定数值的整数，小数部分保留dcount位的随机小数',
          'float|count.dmin-dmax',
          '生成指定数值的整数，小数部分保留大于等于dmin小于等于dmax位的随机小数',
          'float|min~max.dmin-dmax',
          '随机生成大于等于min小于等于max的整数，小数部分保留大于等于dmin小于等于dmax位的随机小数',
        ],
        example: ['float', '-> 123.456', 'float|3.2', '-> 3.14', 'float|123.1-3', '-> 123.4', 'float|1~10.1-2', '-> 3.1'],
      },
    ],
  },
}

const rules = {}

export const getMockRules = () => {
  if (mockRules.isUse) {
    return rules
  }

  Object.keys(mockRules.rules).forEach((key) => {
    const _rules = mockRules.rules[key] || []

    const obj = {
      ruleKeys: [],
      rules: [],
    }

    obj.rules = _rules.map((item) => {
      obj.ruleKeys.push(item.name)

      item.syntax = item.syntax.join('<br/>')
      item.example = item.example.join('<br/>')
      item.searchKey = item.searchKey.split(' ').concat([item.name, item.cnName, key]).join(' ')
      item.searchKeys = item.searchKey.split(' ').concat([item.name, item.cnName, key])
      item.key = key + '-' + item.name
      return item
    })

    rules[key] = obj
  })

  console.log(rules)
  mockRules.isUse = true

  return rules
}
