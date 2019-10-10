<template>
    <button class="button"><slot></slot></button>
</template>

<script>
export default {
    name: 'SubmitBtn',
};
</script>

<style scoped>
.button {
    margin: 31px 10px;
    height: 40px;
    background-color: #68b12f;
    border: 1px solid #509111;
    border-bottom: 1px solid #5b992b;
    border-radius: 3px;
    box-shadow: inset 0 1px 0 0 #9fd574;
    color: white;
    font-weight: bold;
    text-shadow: 0 -1px 0 #396715;
}

button:hover {
    opacity: 0.85;
    cursor: pointer;
}
button.submit:active {
    border: 1px solid #20911e;
    box-shadow: 0 0 10px 5px #356b0b inset;
}
</style>
