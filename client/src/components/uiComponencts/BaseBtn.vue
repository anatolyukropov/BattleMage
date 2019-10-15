<template>
    <button class="button"><slot></slot></button>
</template>

<script>
export default {
    name: 'BaseBtn',
};
</script>

<style scoped>
/*.button {
    padding: 1px 8px;
    background: linear-gradient(10deg, #bdbdbd 0%, #eeeeee 100%);
    border: none;
    border-radius: 3px;
    box-shadow: -2px 3px 5px #9e9e9e;
    color: black;
}
.button:hover {
    cursor: pointer;
}
.button:active {
    background: linear-gradient(10deg, #eeeeee 0%, #bdbdbd 100%);
    box-shadow: inset -2px 3px 5px #9e9e9e !important;
}
.button:focus {
    outline: 0 !important;
    opacity: 0.75;
    cursor: pointer;
    box-shadow: -2px 3px 5px #9e9e9e;
}*/

.button {
    color: black;
    background-color: transparent;
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid #2e6da4;
    border-radius: 4px;
}
.button:hover {
    color: #fff;
    background-color: #286090;
    border-color: #204d74;
}

</style>
