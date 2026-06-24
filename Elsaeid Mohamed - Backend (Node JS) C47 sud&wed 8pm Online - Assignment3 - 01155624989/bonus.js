var majorityElement = function(nums) {
    let count = {};

    for (let num of nums) {
        count[num] = (count[num] || 0) + 1;

        if (count[num] > nums.length / 2) {
            return num;
        }
    }
};

// Test
console.log(majorityElement([3, 2, 3]));
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));