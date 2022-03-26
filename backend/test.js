var nums = [3,1,2,3]


var findRepeatNumber = function (nums) {
    let temp = []
    for(let i = 0 ;i<nums.length;i++){
        for(let j = i+1;j<nums.length;j++){
            if (nums[i] == nums[j]) {
                temp.push(nums[j])
            }
            
        }
    }
    return temp[0].toString()
};

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3]));